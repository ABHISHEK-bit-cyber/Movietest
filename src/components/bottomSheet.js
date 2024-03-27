import RBSheet from "react-native-raw-bottom-sheet";

const BottomSheet = ({ sheetRef, open, onClose, onApply }) => {
  return (
    <RBSheet
      ref={sheetRef}
      useNativeDriver={true}
      customStyles={{
        wrapper: {
          backgroundColor: "transparent",
        },
        draggableIcon: {
          backgroundColor: "#000",
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
