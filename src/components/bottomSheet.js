import { useEffect } from "react";
import { Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const BottomSheet = ({ sheetRef, open, onClose, onApply }) => {
  useEffect(() => {
    open ? sheetRef.current?.open() : null;
  });

  return (
    <RBSheet
      ref={sheetRef}
      // useNativeDriver={true}
      onClose={onClose}
      closeOnDragDown={true}
      closeOnPressBack={true}
      animationType="fade"
      openDuration={250}
      closeDuration={250}
      closeOnDragDown={true}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#fff",
        },
      }}
      customModalProps={{
        animationType: "slide",
        statusBarTranslucent: true,
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}
    >
      <Text>hello how are you??</Text>
    </RBSheet>
  );
};

export default BottomSheet;
