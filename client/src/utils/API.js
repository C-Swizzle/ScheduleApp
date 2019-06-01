import axios from "axios";

export default {
  // Gets all books
  getStudents: function() {
    return axios.get("/api/students");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },

  checkInStudent: function(id,obj){
    return axios.post("/api/students/checkin/"+id, obj);
  },
  getTutors: function(){
    return axios.get("/api/tutors");
  },
  newTutor: function(tutorObj){
    return axios.post("/api/tutors",tutorObj);
  },
  getOneTutor: function(id){
    return axios.get("/schedule/tutors/"+id);
  },
  newStudent: function(studObj){
    return axios.post("/api/students",studObj)
  },
  getOneStudent: function(studObj){
    return axios.post("/api/search/students",studObj)
  },
  deleteOneTimeSlot:function(studentId,scheduleId){
    return axios.delete("/api/students/schedule/"+studentId+"/"+scheduleId)
  },
  getHalfHourSlot:function(tutorId,dayString,timeString){
    return axios.get(`/api/tutors/schedule/${tutorId}/${dayString}/${timeString}`)
  },
  getFullDay:function(tutorId,dayString){
    return axios.get(`/api/tutors/schedule/${tutorId}/${dayString}`)
  },
  getScheduleDayId:function(tutorId,dayString){
    return axios.get(`/api/tutors/justtheidplease/schedule/${tutorId}/${dayString}`)
  },
  newScheduleSlot: function(scheduleId,studentId,timeString){
    const objToSend={
      scheduleDayId:scheduleId,
      studentId:studentId,
      timeString:timeString
    }
    return axios.post(`/api/tutors/addtoschedule`,objToSend)
  },
  removeScheduleSlot:function(scheduleId,studentId,timeString){
    const objToSend={
      scheduleDayId:scheduleId,
      studentId:studentId,
      timeString:timeString
    }
    console.log(objToSend)
    return axios.post(`/api/tutors/takeoffschedule`,objToSend)
  },
  noShowStudent:function(id,obj){
    return axios.post("/api/students/noshow/"+id, obj);
  },
  hourlyRequest:function(obj){
    return axios.post("/api/tutors/hourly",obj)
  },
  getTutorIds:function(){
    return axios.get("/api/tutors/allids")
  }
};
