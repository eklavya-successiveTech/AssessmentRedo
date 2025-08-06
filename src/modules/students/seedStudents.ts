// import { StudentModel } from "./models/Student.model";

// export const SeedStudent = async() =>{
//     const count = await StudentModel.countDocuments();
//     if(count>=50){
//         console.error("Seeding exceeds");
//     }
//     await StudentModel.deleteMany();
//     const students : {
//         name: string;
//         age: number;
//         grade: string;
//         email: string;
//     }[]= [];
//     for(let i = 0; i < 50; i++){
//         students.push({
//             name: `Student ${i}`,
//             age: 18+i,
//             grade: ` Grade ${i}`,
//             email: `student${i}@gmail.com`
//         });
//     }

//     await StudentModel.insertMany(students);
//     console.log("Data seeded")

// }
































import { StudentModel } from "./models/Student.model";

export const SeedData = async() =>{
    const count = await StudentModel.countDocuments();

    if(count > 50){
        console.error("no seeding");
        return;
    }
    const data: {
        name: string;
        age: number;
        grade: string;
        subject: string[];
    } []= []
    for(let i =0; i<50; i++){
        data.push({
            name: `student ${i}`,
            age: 18 +i,
            grade: `Grade ${i}`,
            subject: ["maths"],
        })
    }
    const seed = await StudentModel.insertMany(data);
    return seed;
}