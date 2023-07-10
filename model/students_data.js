const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const studentsDataSchema = new mongoose.Schema({

    applicationForAdmission:{
      dateOfApplication: { type: Date, default: Date.now },
      enrolmentNumber: { type: String, required: true, trim: true },
      classOfAdmission: { type: String, required: true, trim: true }
    },
    studentsInformation:{
      studentId: { type: String, required: true, trim: true, default: uuidv4() },
      name: { type: String, required: true, trim: true },
      gender: { type: String, required: true, trim: true },
      dob: { type: String, required: true, trim: true },
      placeOfBirth: { type: String, required: true, trim: true },
      nationality: { type: String, required: true, trim: true },
      religion: { type: String, required: true, trim: true },
      email: { type: String, unique: true, required: true, trim: true },
      contactNumber: { type: String, unique: true, required: true, trim: true }
    },
    parentsOrguardianInformation:{
      father:{
        name: { type: String, required: true, trim: true },
        qualifications: { type: String, required: true, trim: true },
        occupation: { type: String, required: true, trim: true },
        email: { type: String, unique: true, required: true, trim: true },
        contactNumber: { type: String, unique: true, required: true, trim: true }
      },
      mother:{
        name: { type: String, required: true, trim: true },
        qualifications: { type: String, required: true, trim: true },
        occupation: { type: String, required: true, trim: true },
        email: { type: String, unique: true, required: true, trim: true },
        contactNumber: { type: String, unique: true, required: true, trim: true }
      },
      localGuardian: {
        name: String,
        qualifications: String,
        occupation: String,
        contactNumber: String,
        email: String
      },
      annualFamilyIncome: String
    },
    residence:{
      permanentAddress:{
        apartmentNameOrHouseNoOrSteet: { type: String, required: true, trim: true },
        cityOrTownOrVillage: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        pinCode: { type: String, required: true, trim: true }
      },
      currentAddress:{
        apartmentNameOrHouseNoOrSteet: String,
        cityOrTownOrVillage: String,
        state: String,
        country: String,
        pinCode: String
      }
    },
    healthRecords: {
      height: String,
      weight: String,
      bloodGroup: String,
      historyOfmedicalConditions: String,
      familyPhysicianContact: String
    },
    academicRecordsAndOthers: {
      percentageOfPreviousClass: String,
      stateNationalInternationalAchievements: String,
      sportsOrCoCurricularAchievements: String
    },
    uploads: {
      photograph: String,
      signature: String,
      photoIdentityCard: String
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  });

module.exports = mongoose.model('students-data', studentsDataSchema);




// application for admission
// 1. date of application (from application section)
// 2. enrolment number
// 3. class of admission
// student's information
// 1. name
// 2. gender
// 3. dob
// 4. place of birth
// 5. nationality
// 6. religion
// 7. email address
// 8. contact number
// parents'/guardian's information
// 1. father's name, qualifications, occupation, contact no, email id
// 2. mother's name, qualifications, occupation, contact no, email id
// 3. local guardian's name, qualifications, occupation, contact no, email id
// 4. annual family income
// residence
// 1. permanent address -  a) apartment name/ house no/ steet. b) city/town/village. c) state. d) country. e) pin code
// 2. current address
// health records
// 1. height,
// 2. weight,
// 3. blood group,
// 4. history of medical conditions(including allergies)/surgery
// 5. contact details of family physician
// academic and other records
// 1. percentage secured in the previous class
// 2. academic achievements at state/national/international level
// 3. achievements in sports or other co-curricular activities
// uploads
// 1. photograph
// 2. signature
// 3. photo identity card