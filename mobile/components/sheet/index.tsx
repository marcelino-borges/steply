import type { PropsWithChildren } from "react";
import { useCallback, useEffect, useState } from "react";
import { Modal, Pressable, View, ViewStyle } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Typography from "@/components/typography";
import { styles } from "./styles";

interface BottomSheetProps extends PropsWithChildren {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  modalStyle?: ViewStyle;
}

export default function BottomSheet({
  onOpenChange,
  open,
  children,
  title,
  modalStyle,
}: BottomSheetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const backdropOpacity = useSharedValue(0);
  const modalTranslateY = useSharedValue(300);

  const hideModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      backdropOpacity.value = withTiming(1, { duration: 300 });
      modalTranslateY.value = withTiming(0, { duration: 300 });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 300 });
      modalTranslateY.value = withTiming(
        300,
        {
          duration: 300,
        },
        () => {
          runOnJS(hideModal)();
        }
      );
    }
  }, [open, backdropOpacity, modalTranslateY, hideModal]);

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
    backgroundColor: `rgba(0, 0, 0, ${backdropOpacity.value * 0.5})`,
  }));

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: modalTranslateY.value }],
  }));

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        onOpenChange(!open);
      }}
      style={modalStyle}
    >
      <View style={styles.backdrop}>
        <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
          <Pressable
            style={{ flex: 1, width: "100%" }}
            onPress={() => onOpenChange(false)}
          />
          <Animated.View
            style={[styles.modalView, modalAnimatedStyle]}
            onStartShouldSetResponder={() => true}
          >
            {!!title?.length && <Typography weight="bold">{title}</Typography>}

            <View
              style={[styles.content, !title?.length && styles.contentNoTitle]}
            >
              <Typography size="sm">{children}</Typography>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
}
