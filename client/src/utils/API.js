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

  checkIn: function(id,obj){
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
  }
};
