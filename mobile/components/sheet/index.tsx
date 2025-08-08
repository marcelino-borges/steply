import { StyleSheet } from "react-native";
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import Typography from "@/components/typography";
import { SPACING } from "@/constants/spacings";
import { FONT_WEIGHT } from "@/constants/fonts";

interface SheetProps extends PropsWithChildren {
  children: ReactNode;
  title: string;
  open: boolean;
  onClose: VoidFunction;
}

export default function Sheet({ children, title, open, onClose }: SheetProps) {
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  useEffect(() => {
    if (open) {
      sheetRef.current?.present();
    } else {
      sheetRef.current?.close();
    }
  }, [open]);

  return (
    // <BottomSheetModalProvider>
    //   <BottomSheetModal
    //     enableDynamicSizing={false}
    //     ref={sheetRef}
    //     style={styles.root}
    //     snapPoints={snapPoints}
    //     onDismiss={() => {
    //       onClose();
    //       sheetRef.current?.close();
    //       console.log("----------------- in close");
    //     }}
    //     backgroundStyle={{ backgroundColor: "yellow" }}
    //   >
    //     <BottomSheetView style={styles.view}>
    //       <Typography size="lg" weight={FONT_WEIGHT[800]}>
    //         {title}
    //       </Typography>
    //       <BottomSheetScrollView>{children}</BottomSheetScrollView>
    //     </BottomSheetView>
    //   </BottomSheetModal>
    // </BottomSheetModalProvider>
    null
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    zIndex: 100000,
    backgroundColor: "red",
  },
  view: {
    flex: 1,
    zIndex: 100000,
    backgroundColor: "green",
    position: "fixed",
  },
  scrollView: {
    backgroundColor: "blue",
    zIndex: 100000,
  },
});
