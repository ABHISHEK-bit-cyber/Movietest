import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {styles} from './Style';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePickerDialog from './datepickerDialog';

const BottomSheet = ({sheetRef, open, onClose, onApply}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDate2, setSelectedDate2] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePicker2Visible, setDatePicker2Visibility] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    open ? sheetRef.current?.open() : null;
  });

  const handleConfirm = date => {
    const formattedDate = moment(date).format('DD-MM-YYYY');
    setSelectedDate(formattedDate);
    setDatePickerVisibility(false);
    setDisabled(false);
  };

  const handleConfirm2 = date => {
    const formattedDate = moment(date).format('DD-MM-YYYY');
    setSelectedDate2(formattedDate);
    setDatePicker2Visibility(false);
    setDisabled(false);
  };

  const HandleApply = () => {
    if(selectedDate && selectedDate2) {
      onApply({dateFrom: selectedDate, dateTo: selectedDate2});
    } else {
      Snackbar.show({
        text: 'Please select both dates',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#1a73e8',
        textColor: 'white'
      });
    }
  };

  return (
    <RBSheet
      ref={sheetRef}
      height={180}
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
          backgroundColor: '#fff',
        },
      }}
      customModalProps={{
        animationType: 'slide',
        statusBarTranslucent: true,
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={date => handleConfirm(date)}
        onCancel={() => setDatePickerVisibility(false)}
      />
      
      <DateTimePickerModal
        isVisible={isDatePicker2Visible}
        mode="date"
        onConfirm={date => handleConfirm2(date)}
        onCancel={() => setDatePicker2Visibility(false)}
      />
      
      <View
        style={styles.datePickerContainers}>
        <DatePickerDialog
          selectedDate={selectedDate || 'Start date'}
          onPress={() => setDatePickerVisibility(true)}
        />
        <DatePickerDialog
          selectedDate={selectedDate2 || 'End date'}
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
