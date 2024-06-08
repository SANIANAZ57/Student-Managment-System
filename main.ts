#! /usr/bin/env node

import inquirer from "inquirer"

class   Student {
    static counter =50000;
    ID : number;
    name : string;
    courses : string[];
    balance : number;

    constructor(name :string){
        this.ID = Student.counter++;
        this.name =name;
        this.courses =[];
        this.balance =5000; 
    }

    enroll_courses(course :string){
        this.courses.push(course);
    }
    view_balance(){
        console.log(`balance for ${this.name} :${this.balance}`)
    }

    pay_fees(amount:number){
        this.balance -= amount;
        console.log(`$${amount} fees paid sucessfully ${this.name}`)
        console.log(`Remining Balance:$${this.balance}`)
    }

    show_status(){
        console.log(`id :${this.ID}`)
        console.log(`Name :${this.name}`);
        console.log(`courses:${this.courses}`);
        console.log(`balance :${this.balance}`)
    }
}

class student_manager {
    students :Student[]

    constructor(){
        this.students =[];
    }
     

    add_student(name:string){
       let student = new Student(name);
        this.students.push(student);
        console.log(`Student:${name} added successfully .Student  ID:${ student.ID}`)
    }

    enroll_student(student_id :number, course:string){
         let student = this.find_student(student_id);
         if (student)
            {
            student.enroll_courses(course);
            console.log(`${student.name} enrolled in ${course} successfully`)
        }

    }
    view_student_balance (student_id :number){
        let student = this.find_student(student_id);
        if (student){
            student.view_balance();
        }
        else{
            console.log ("student not found. please enter a correct student id ")

        }

    }
    pay_student_fees(student_id :number, amount:number){
        let student =this.find_student(student_id);
        if(student){
            student.pay_fees(amount);
        }
        else{
            console.log("student not found,please enter a correct student id");
        }
    }

    show_student_status (student_id: number){
        let student = this.find_student(student_id);
        if (student){
            student.show_status();
        }
    }

    find_student (student_id :number){
        return this.students.find(std => std.ID ===student_id)
    }
}
 
async function main (){
     console.log ( "welcome to  Student Management System");
     console.log("*".repeat(30));

     let  Student_manager = new student_manager();
     while( true){
        let choice = await inquirer.prompt([
            {
                name:"choice",
                type:"list",
                massage:"select an option",
                choices:[
                    "Add student",
                    "Enroll student",
                    "view Student Balance",
                    "Pay Fees",
                    "Show  Status",
                    "Exit"
                ]
            }
        ])

        switch(choice.choice){
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name:"name",
                        type:"input",
                        message:"Enter a student name",
                    }
                ]);
                Student_manager.add_student(name_input.name);
                break;
       
            case "Enroll student":
                let course_input =await inquirer.prompt([
                    {
                        name :"student_id",
                        type:"number",
                        massage:"enter a student id",
                    },
                    {
                        name:"course",
                        type:"input",
                        message:"enter a course name",
                    }
                ]);
                Student_manager.enroll_student(course_input.student_id,course_input.course);
                break;

            case "view Student Balance":
                let balance_input =await inquirer.prompt([
                    {
                        name:"student_id",
                        type:"number",
                        message:"enter a student id"
                    }
                ]);
                Student_manager.view_student_balance(balance_input.student_id);
                break;

            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name:"student id",
                        type:"number",
                        massage:"enter a student id"
                    },
                    {
                        name:"amount",
                        type:"number",
                        massage:"enter tha amount to pay"
                    }

                ]);    
                Student_manager.pay_student_fees(fees_input.student_id ,fees_input.amount);
                break;
                
            case "Show  Status":
                let status_input = await inquirer.prompt([
                    {
                        name:"student id",
                        type:"number",
                        massage:"enter a student id"
                    }
                ]); 
                Student_manager.show_student_status(status_input.student_id);
                break;
            
            case"Exit":
                 console.log("Exiting....");
                 process.exit();
        }
     }
}


main();

console.log("The End!")