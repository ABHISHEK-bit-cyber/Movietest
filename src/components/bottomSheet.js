import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { styles } from "./Style";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePickerDialog from "./datepickerDialog";
import { Picker } from "@react-native-picker/picker";
import Snackbar from "react-native-snackbar";

const BottomSheet = ({ sheetRef, open, onClose, onApply,country }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDate2, setSelectedDate2] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePicker2Visible, setDatePicker2Visibility] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [countryy, setCountryy] = useState(country);
  const countryNames = [
    { label: "India", value: "in" },
    { label: "United Arab Emirates", value: "ae" },
    { label: "Argentina", value: "ar" },
    { label: "Austria", value: "at" },
    { label: "Australia", value: "au" },
    { label: "Belgium", value: "be" },
    { label: "Brazil", value: "br" },
    { label: "Canada", value: "ca" },
    { label: "Switzerland", value: "ch" },
    { label: "China", value: "cn" },
    { label: "Colombia", value: "co" },
    { label: "Cuba", value: "cu" },
    { label: "Czech Republic", value: "cz" },
    { label: "Germany", value: "de" },
    { label: "Egypt", value: "eg" },
    { label: "France", value: "fr" },
    { label: "United Kingdom", value: "gb" },
    { label: "Greece", value: "gr" },
    { label: "Hong Kong", value: "hk" },
    { label: "Hungary", value: "hu" },
    { label: "Indonesia", value: "id" },
    { label: "Ireland", value: "ie" },
    { label: "Israel", value: "il" },
    { label: "Italy", value: "it" },
    { label: "Japan", value: "jp" },
    { label: "South Korea", value: "kr" },
    { label: "Lithuania", value: "lt" },
    { label: "Latvia", value: "lv" },
    { label: "Morocco", value: "ma" },
    { label: "Mexico", value: "mx" },
    { label: "Malaysia", value: "my" },
    { label: "Nigeria", value: "ng" },
    { label: "Netherlands", value: "nl" },
    { label: "Norway", value: "no" },
    { label: "New Zealand", value: "nz" },
    { label: "Philippines", value: "ph" },
    { label: "Poland", value: "pl" },
    { label: "Portugal", value: "pt" },
    { label: "Romania", value: "ro" },
    { label: "Serbia", value: "rs" },
    { label: "Russia", value: "ru" },
    { label: "Saudi Arabia", value: "sa" },
    { label: "Sweden", value: "se" },
    { label: "Singapore", value: "sg" },
    { label: "Slovakia", value: "sk" },
    { label: "Thailand", value: "th" },
    { label: "Turkey", value: "tr" },
    { label: "Taiwan", value: "tw" },
    { label: "Ukraine", value: "ua" },
    { label: "United States", value: "us" },
    { label: "Venezuela", value: "ve" },
    { label: "South Africa", value: "za" },
  ];

  useEffect(() => {
    open ? sheetRef.current?.open() : null;
  });

  const handleConfirm = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setDatePickerVisibility(false);
    setDisabled(false);
  };

  const handleConfirm2 = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate2(formattedDate);
    setDatePicker2Visibility(false);
    setDisabled(false);
  };

  const HandleApply = () => {
    if (selectedDate && selectedDate2) {
      onApply({ dateFrom: selectedDate, dateTo: selectedDate2, country: countryy });
    } else {
      Snackbar.show({
        text: "Please select both dates",
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  return (
    <RBSheet
      ref={sheetRef}
      height={220}
      onClose={onClose}
      closeOnDragDown={true}
      closeOnPressBack={true}
      animationType="fade"
      openDuration={250}
      closeDuration={250}
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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => handleConfirm(date)}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <DateTimePickerModal
        isVisible={isDatePicker2Visible}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => handleConfirm2(date)}
        onCancel={() => setDatePicker2Visibility(false)}
      />

      <View
        style={{
          marginHorizontal: 10,
          marginTop: 15,
          borderRadius: 10,
          borderColor: "black",
          borderWidth: 1,
        }}
      >
        <Picker
          style={styles.pickerContainer}
          selectedValue={countryy}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) => {
            setCountryy(itemValue);
          }}
        >
          {countryNames.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.datePickerContainers}>
        <DatePickerDialog
          selectedDate={selectedDate || "Start date"}
          onPress={() => setDatePickerVisibility(true)}
        />
        <DatePickerDialog
          selectedDate={selectedDate2 || "End date"}
          onPress={() => setDatePicker2Visibility(true)}
        />
      </View>

      <TouchableOpacity style={styles.applyBtnContainer} onPress={HandleApply}>
        <Text style={styles.whiteColor}>Apply</Text>
      </TouchableOpacity>
    </RBSheet>
  );
};

export default BottomSheet;
