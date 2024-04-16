function processInfo(username, firstname, lastName, description, dateOfBirth, programmingLanguages) {
  var dbString = stringify(username, firstname, lastName, description, dateOfBirth, programmingLanguages);
  localStorage.setItem(username, dbString);
}

function stringify(username, firstname, lastName, description, dateOfBirth, programmingLanguages) {
  var firstStr = 'First Name: ' + firstname + '   |';
  var lastStr = 'Last Name: ' + lastName + '   |';
  var descStr = 'Description: ' + description + '   |' ;
  var dob = 'Date Of Birth ' + dateOfBirth + '   |';
  var langStr = '';
  if (programmingLanguages.length > 0) {
    langStr = 'Programming languages: ' + programmingLanguages.join(", ");
  }
  return firstStr + '    ' + lastStr + '    ' + descStr + '    ' + dob + '    ' + langStr;
}

function getStudentsDb() {
  var students = [];
  for (i = 0; i < localStorage.length; i++) {
    var studentId = localStorage.key(i);
    var studentInfo = localStorage.getItem(studentId);
    var tmpStudent = [];
    tmpStudent[0] = studentId;
    tmpStudent[1] = getFirstName(studentInfo);
    tmpStudent[2] = getLastName(studentInfo);
    tmpStudent[3] = getDateOfBirth(studentInfo);
    tmpStudent[4] = getDescription(studentInfo);
    tmpStudent[5] = getLanguages(studentInfo);
    console.log
    students.push(tmpStudent);
  }
  return students;
}

function getFirstName(studentInfo) {
  var start = studentInfo.indexOf('Name: ') + 6;
  var end = studentInfo.indexOf(' ', start);
  var firstName = studentInfo.substring(start, end);
  return firstName;
}

function getLastName(studentInfo) {
  var start = studentInfo.indexOf('Last Name: ') + 11;
  var end = studentInfo.indexOf('   ', start);
  var lastName = studentInfo.substring(start, end);
  return lastName;
}

function getDateOfBirth(studentInfo) {
  var start = studentInfo.indexOf('DateOfBirth: ') + 13;
  var end = studentInfo.indexOf('    ', start);
  return studentInfo.substring(start, end);
}

function getDescription(studentInfo) {
  var start = studentInfo.indexOf('Description: ') + 13;
  var end = studentInfo.indexOf('    ', start);
  return studentInfo.substring(start, end);
}

function getLanguages(studentInfo) {
  var start = studentInfo.indexOf('Programming languages: ') + 23;
  var end = studentInfo.indexOf('    ', start);
  return studentInfo.substring(start, end).split(',').map(function(lang) {
    return lang.trim();
  });
}