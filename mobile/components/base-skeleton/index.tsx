import ContentLoader, {
  type IContentLoaderProps,
  Rect,
} from "react-content-loader/native";
import { RADIUS } from "@/constants/radius";

interface SkeletonProps extends Omit<IContentLoaderProps, "width" | "height"> {
  radius?: keyof typeof RADIUS | "none";
  width: number;
  height: number;
}

export default function Skeleton({
  width,
  height,
  radius = "xs",
  ...props
}: SkeletonProps) {
  return (
    <ContentLoader
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{
        width: Number(width),
        height: Number(height),
      }}
      backgroundColor="#dfdfdf"
      foregroundColor="#f5f5f5"
      {...props}
    >
      <Rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx={RADIUS[radius]}
        ry={RADIUS[radius]}
      />
    </ContentLoader>
  );
}
