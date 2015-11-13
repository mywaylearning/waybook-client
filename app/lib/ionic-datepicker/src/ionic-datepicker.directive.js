//By Rajeshwar Patlolla - rajeshwar.patlolla@gmail.com
//https://github.com/rajeshwarpatlolla

(function () {
  'use strict';

  angular.module('ionic-datepicker')
    .directive('ionicDatepicker', IonicDatepicker);

  IonicDatepicker.$inject = ['$ionicPopup', '$ionicModal', 'IonicDatepickerService'];
  function IonicDatepicker($ionicPopup, $ionicModal, IonicDatepickerService) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        inputObj: "=inputObj"
      },
      link: function (scope, element, attrs) {

        function resetTime(date) {
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
        }

        scope.currentMonth = '';
        scope.currentYear = '';
        scope.disabledDates = [];

        //Setting the title, today, close and set strings for the date picker
        scope.titleLabel = scope.inputObj.titleLabel ? (scope.inputObj.titleLabel) : 'Select Date';
        scope.todayLabel = scope.inputObj.todayLabel ? (scope.inputObj.todayLabel) : 'Today';
        scope.closeLabel = scope.inputObj.closeLabel ? (scope.inputObj.closeLabel) : 'Close';
        scope.setLabel = scope.inputObj.setLabel ? (scope.inputObj.setLabel) : 'Set';
        scope.showTodayButton = scope.inputObj.hasOwnProperty('showTodayButton') ? (scope.inputObj.showTodayButton) : true;
        scope.showSetButton = scope.inputObj.hasOwnProperty('showSetButton') ? (scope.inputObj.showSetButton) : true;
        scope.showCloseButton = scope.inputObj.hasOwnProperty('showCloseButton') ? (scope.inputObj.showCloseButton) : true;
        scope.errorMsgLabel = scope.inputObj.errorMsgLabel ? (scope.inputObj.errorMsgLabel) : 'Please select a date.';
        scope.setButtonType = scope.inputObj.setButtonType ? (scope.inputObj.setButtonType) : 'button-positive';
        scope.todayButtonType = scope.inputObj.todayButtonType ? (scope.inputObj.todayButtonType) : 'button-stable';
        scope.closeButtonType = scope.inputObj.closeButtonType ? (scope.inputObj.closeButtonType) : 'button-stable';
        scope.templateType = scope.inputObj.templateType ? (scope.inputObj.templateType) : 'modal';
        scope.modalHeaderColor = scope.inputObj.modalHeaderColor ? (scope.inputObj.modalHeaderColor) : 'bar-stable';
        scope.modalFooterColor = scope.inputObj.modalFooterColor ? (scope.inputObj.modalFooterColor) : 'bar-stable';
        scope.selectMultipleDates = scope.inputObj.hasOwnProperty('selectMultipleDates') ? (scope.inputObj.selectMultipleDates) : false;

        scope.enableDatesFrom = {epoch: 0, isSet: false};
        scope.enableDatesTo = {epoch: 0, isSet: false};

        // creating buttons
        scope.buttons  = [];

        if(scope.showCloseButton){
          scope.buttons.push({text: scope.closeLabel,type: scope.closeButtonType,onTap: function (e) {scope.inputObj.callback(undefined);}});
        }

        if(scope.showTodayButton){
          scope.buttons.push({text: scope.todayLabel, type: scope.todayButtonType, onTap: function (e) { todaySelected(); e.preventDefault();}});
        }

        if(scope.showSetButton){
          scope.buttons.push({text: scope.setLabel,type: scope.setButtonType,onTap: function () { dateSelected();}});
        }


        //Setting the from and to dates
        if (scope.inputObj.from) {
          scope.enableDatesFrom.isSet = true;
          scope.enableDatesFrom.epoch = scope.inputObj.from.getTime();
        }

        if (scope.inputObj.to) {
          scope.enableDatesTo.isSet = true;
          scope.enableDatesTo.epoch = scope.inputObj.to.getTime();
        }

        //Setting the input date for the date picker
        var inputDate = null;
        if (scope.inputObj.inputDate) {
          inputDate = scope.inputObj.inputDate;
        }

        // Define defaults of selected date (or dates if multiple)
        scope.selectedDate = {
          submitted: false,
          date: scope.selectMultipleDates ? [] : null
        };

        // Check if it's an array for multiple selection
        if (angular.isArray(inputDate)) {
          scope.selectedDate.date = inputDate.map(function(date) {
            var _date = (date instanceof Date) ? date : new Date(date);
            resetTime(_date);
            return {
              obj: _date,
              string: _date.toString()
            };
          });
        } else if (inputDate) {
          scope.selectedDate.date = inputDate;
          scope.selectedDate.string = inputDate.toString();
        }

        //Setting the months list. This is useful, if the component needs to use some other language.
        scope.monthsList = [];
        if (scope.inputObj.monthList && scope.inputObj.monthList.length === 12) {
          scope.monthsList = scope.inputObj.monthList;
        } else {
          scope.monthsList = IonicDatepickerService.monthsList;
        }
        if (scope.inputObj.weekDaysList && scope.inputObj.weekDaysList.length === 7) {
          scope.weekNames = scope.inputObj.weekDaysList;
        } else {
          scope.weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        }
        scope.yearsList = IonicDatepickerService.yearsList;

        //Setting whether to show Monday as the first day of the week or not.
        if (scope.inputObj.mondayFirst) {
          scope.mondayFirst = true;
        } else {
          scope.mondayFirst = false;
        }

        //Setting the disabled dates list.
        if (scope.inputObj.disabledDates && scope.inputObj.disabledDates.length === 0) {
          scope.disabledDates = [];
        } else {
          angular.forEach(scope.inputObj.disabledDates, function (val, key) {
            resetTime(val);

            scope.disabledDates.push(val.getTime());
          });
        }

        var currentDate = new Date();

        if (scope.selectedDate.date) {
          if (angular.isArray(scope.selectedDate.date) && scope.selectedDate.date.length > 0) {
            currentDate = scope.selectedDate.date[scope.selectedDate.date.length - 1].obj;
          } else if (!angular.isArray(scope.selectedDate.date)) {
            currentDate = scope.selectedDate.date;
          }
        }

        resetTime(currentDate);

        scope.today = {};

        if (scope.mondayFirst === true) {
          var lastWeekDay = scope.weekNames.shift();
          scope.weekNames.push(lastWeekDay);
        }

        var tempTodayObj = new Date();
        var tempToday = new Date(tempTodayObj.getFullYear(), tempTodayObj.getMonth(), tempTodayObj.getDate());

        scope.today = {
          date: tempToday.getDate(),
          month: tempToday.getMonth(),
          year: tempToday.getFullYear(),
          day: tempToday.getDay(),
          dateString: tempToday.toString(),
          epochLocal: tempToday.getTime(),
          epochUTC: (tempToday.getTime() + (tempToday.getTimezoneOffset() * 60 * 1000))
        };

        var refreshDateList = function(date) {
          resetTime(date);

          currentDate = angular.copy(date);

          var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
          var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

          scope.dayList = [];

          for (var i = firstDay; i <= lastDay; i++) {
            var tempDate = new Date(date.getFullYear(), date.getMonth(), i);
            scope.dayList.push({
              date: tempDate.getDate(),
              month: tempDate.getMonth(),
              year: tempDate.getFullYear(),
              day: tempDate.getDay(),
              dateString: tempDate.toString(),
              epochLocal: tempDate.getTime(),
              epochUTC: (tempDate.getTime() + (tempDate.getTimezoneOffset() * 60 * 1000))
            });
          }

          //To set Monday as the first day of the week.
          var firstDayMonday = scope.dayList[0].day - scope.mondayFirst;
          firstDayMonday = (firstDayMonday < 0) ? 6 : firstDayMonday;

          scope.currentMonthFirstDayEpoch = scope.dayList[0].epochLocal;
          scope.currentMonthLastDayEpoch = scope.dayList[scope.dayList.length - 1].epochLocal;

          for (var j = 0; j < firstDayMonday; j++) {
            scope.dayList.unshift({});
          }

          scope.rows = [];
          scope.cols = [];

          scope.currentMonth = scope.monthsList[date.getMonth()];
          scope.currentYear = date.getFullYear();
          scope.currentMonthSelected = scope.currentMonth;
          scope.currentYearSelected = scope.currentYear;

          scope.numColumns = 7;
          scope.rows.length = 6;
          scope.cols.length = scope.numColumns;
        };

        scope.monthChanged = function (month) {
          var monthNumber = scope.monthsList.indexOf(month);
          currentDate.setMonth(monthNumber);
          refreshDateList(currentDate);
        };

        scope.yearChanged = function (year) {
          currentDate.setFullYear(year);
          refreshDateList(currentDate);
        };

        scope.prevMonth = function () {
          if (currentDate.getMonth() === 1) {
            currentDate.setFullYear(currentDate.getFullYear());
          }
          currentDate.setMonth(currentDate.getMonth() - 1);

          scope.currentMonth = scope.monthsList[currentDate.getMonth()];
          scope.currentYear = currentDate.getFullYear();

          refreshDateList(currentDate);
        };

        scope.nextMonth = function () {
          if (currentDate.getMonth() === 11) {
            currentDate.setFullYear(currentDate.getFullYear());
          }
          currentDate.setMonth(currentDate.getMonth() + 1);
          scope.currentMonth = scope.monthsList[currentDate.getMonth()];
          scope.currentYear = currentDate.getFullYear();
          refreshDateList(currentDate);
        };

        //Called when the user clicks on any date.
        scope.dateSelected = function(date) {
          if(!date) return;

          if (scope.selectMultipleDates) {
            var _dateAlreadySelected = scope.checkIfAlreadySelected(date);

            if (_dateAlreadySelected) {
              scope.selectedDate.date.splice(scope.selectedDate.date.indexOf(_dateAlreadySelected), 1);
            } else {
              scope.selectedDate.date.push({
                obj: new Date(date.dateString),
                string: date.dateString
              });
            }

            // Sort the dates from most recent
            scope.selectedDate.date.sort(function(a, b) {
              return a.obj - b.obj;
            });

          } else {
            scope.selectedDate.string = date.dateString;
            scope.selectedDate.date = new Date(date.dateString);
          }

          // Check if there is a callback for each date click
          if (typeof scope.inputObj.callbackOnDateClick === 'function') {
            var _selectedDate;
            if (angular.isArray(scope.selectedDate.date)) {
              _selectedDate = scope.selectedDate.date.map(function(selectedDate) {
                return selectedDate.string;
              });
            } else {
              _selectedDate = scope.selectedDate.date.string;
            }

            return scope.inputObj.callbackOnDateClick(_selectedDate);
          }

        };

        scope.isDateSelected = function(date) {
          if (!date) return;
          if (!date.dateString) return;
          if (scope.selectMultipleDates) {
            var _isSelected = false;
            angular.forEach(scope.selectedDate.date, function(dateSelected) {
              if (dateSelected.string === date.dateString && date.day != undefined) {
                _isSelected = true;
              }
            });

            return _isSelected;
          } else {
            return date.dateString === scope.selectedDate.string && date.day != undefined;
          }
        };

        scope.checkIfAlreadySelected = function(date) {
          var _dateFound = false;
          angular.forEach(scope.selectedDate.date, function(selectedDate, index) {
            if (selectedDate.string === date.dateString) {
              _dateFound = selectedDate;
            }
          });

          return _dateFound;
        };

        //Called when the user clicks on set.
        function dateSelected() {
          scope.selectedDate.submitted = true;
          if (scope.selectedDate.date) {
            if (scope.selectMultipleDates) {
              var _selectedDates = scope.selectedDate.date.map(function(selectedDate) {
                return selectedDate.string;
              });

              return scope.inputObj.callback(_selectedDates);
            }
            scope.inputObj.callback(scope.selectedDate.date);
          }
        }

        //Called when the user clicks on the 'Today' button
        function todaySelected() {
          var today = new Date();
          resetTime(today);

          var tempEpoch = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          var todayObj = {
            date: today.getDate(),
            month: today.getMonth(),
            year: today.getFullYear(),
            day: today.getDay(),
            dateString: today.toString(),
            epochLocal: tempEpoch.getTime(),
            epochUTC: (tempEpoch.getTime() + (tempEpoch.getTimezoneOffset() * 60 * 1000))
          };

          scope.selectedDate.selected = true;

          if (scope.selectMultipleDates) {
            scope.selectedDate.date.push({
              obj: new Date(todayObj.dateString),
              string: todayObj.dateString
            });
          } else {
            scope.selectedDate.date = today;
            scope.selectedDate.string = todayObj.dateString;
          }

          refreshDateList(today);
        }

        //Called when the user clicks on the 'Close' button of the modal
        scope.closeIonicDatePickerModal = function () {
          scope.closeModal();
        };
        //Called when the user clicks on the 'Today' button of the modal
        scope.setIonicDatePickerTodayDate = function () {
          todaySelected();
        };
        //Called when the user clicks on the Set' button of the modal
        scope.setIonicDatePickerDate = function () {
          dateSelected();
          if (scope.selectedDate.date) {
            scope.closeModal();
          }
        };

        //Getting the reference for the 'ionic-datepicker' modal.
        $ionicModal.fromTemplateUrl('ionic-datepicker-modal.html', {
          scope: scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          scope.modal = modal;
        });
        scope.openModal = function () {
          scope.modal.show();
        };

        scope.closeModal = function () {
          scope.modal.hide();
        };

        //Called when the user clicks on the button to invoke the 'ionic-datepicker'
        element.on("click", function () {

          refreshDateList(currentDate);

          if (scope.templateType.toLowerCase() === 'modal') {
            scope.openModal();
          } else {
            //Getting the reference for the 'ionic-datepicker' popup.
            $ionicPopup.show({
              templateUrl: 'ionic-datepicker-popup.html',
              title: scope.titleLabel,
              subTitle: '',
              scope: scope,
              buttons: scope.buttons
            });
          }
        });
      }
    };
  }

})();
