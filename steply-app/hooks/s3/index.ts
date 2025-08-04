import { useRef, useState } from "react";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { useAuth } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Buffer } from "buffer";

global.Buffer = Buffer;

export const useFileStorage = () => {
  const s3Client = useRef(
    new S3Client({
      region: "us-east-2",
      credentials: {
        accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY ?? "",
        secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY ?? "",
      },
    })
  );
  const { userId } = useAuth();
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchImageFromUri = async (uri: string) => {
    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();

    return Buffer.from(arrayBuffer);
  };

  const uploadFile = async (
    userBucket: string,
    uri: string,
    mimeType: string,
    objectName?: string
  ) => {
    let img = null;
    setIsUploading(true);

    try {
      img = await fetchImageFromUri(uri);
    } catch (error) {
      console.log(
        "------------- [ERROR] Error fetching image from device uri",
        error
      );
      return { error: t("files.invalidFile"), data: null };
    }

    const filename = uri.split("/").pop();

    if (!filename?.length) {
      return { error: t("files.invalidFile"), data: null };
    }

    const bucketName = process.env.EXPO_PUBLIC_AWS_S3_BUCKET_NAME;
    const awsBaseUrl = process.env.EXPO_PUBLIC_AWS_BASE_URL;

    if (!bucketName?.length || !awsBaseUrl?.length) {
      console.log(
        "----------- [ERROR] Env AWS_S3_BUCKET_NAME or AWS_BASE_URL not found",
        { AWS_BASE_URL: awsBaseUrl, AWS_S3_BUCKET_NAME: bucketName }
      );
      return { error: t("common.unknownError"), data: null };
    }

    const [_, extension] = filename.split(".");
    const now = new Date();
    const timestamp = format(now, "yyyyMMddHHmmss");

    const key = `users/${userId}/${userBucket}/${
      objectName ?? timestamp
    }.${extension}`;

    try {
      await s3Client.current.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: img,
          ContentType: mimeType,
        })
      );

      console.log(
        "----------- [DEBUG] File uploaded successfully",
        `${awsBaseUrl}/${key}`
      );
      setIsUploading(false);
      return { data: `${awsBaseUrl}/${key}`, error: null };
    } catch (error) {
      console.log("----------- [ERROR] Error uploading file", error);
      setIsUploading(false);
      return { error: t("files.uploadError"), data: null };
    }
  };

  const deleteFile = async (url: string) => {
    setIsDeleting(true);
    const bucketName = process.env.EXPO_PUBLIC_AWS_S3_BUCKET_NAME;
    const baseUrl = process.env.EXPO_PUBLIC_AWS_BASE_URL;

    if (!bucketName?.length || !baseUrl?.length) {
      console.log(
        "----------- [ERROR] Env AWS_S3_BUCKET_NAME or EXPO_PUBLIC_AWS_BASE_URL not found",
        {
          AWS_S3_BUCKET_NAME: bucketName,
          EXPO_PUBLIC_AWS_BASE_URL: baseUrl,
        }
      );

      return { error: t("common.unknownError"), data: null };
    }

    const key = url.replace(baseUrl, "");

    try {
      await s3Client.current.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: key,
        })
      );

      console.log("----------- [DEBUG] File deleted successfully", key);
      setIsDeleting(false);
      return { data: `${key}`, error: null };
    } catch (error) {
      console.log("----------- [ERROR] Error deleting file", error);
      setIsDeleting(false);
      return { error: t("files.uploadError"), data: null };
    }
  };

  return { uploadFile, deleteFile, isDeleting, isUploading };
};
