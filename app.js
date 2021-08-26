const fs = require('fs');
const args = process.argv;

switch (args[2]) {
    case 'add':
        addFunction();
        break;
    case 'del':
        deleteFunction();
        break;
    case 'show':
        listFunction();
        break;
}

function addFunction(){
    const newTask = args[3];
    // console.log(newTask);
    if(newTask){
        fs.appendFile("taskList.txt", newTask + "\n", (err, data)=>{
            if(err)
                console.log(err);
            else
                console.log("Task added successfully...");
        })
    }else{
        console.log('Nothing is added. Please provie new task string!!');
    }
}

function deleteFunction(){
    const index = args[3]-1;
    if(index){
        let data = fs.readFileSync("taskList.txt").toString().split("\n");
        if(data.length < index){
            console.log('Nothing is deleted. Please provide correct index no.!!');
        }else{
            let newData = data.filter((ele, idx)=>{
                return idx !== Number(index);
            })
    
            fs.writeFileSync("taskList.txt", newData.toString().replace(/,/g, "\n") );
            console.log('Task deleted successfully...');
        }
    }else{
        console.log('Nothing is deleted. Please provide index no. which is to be deleted');
    }
}

function listFunction(){
    let data = fs.readFileSync("taskList.txt").toString().split("\n");
    if(data.length === 0){
        console.log('File is empty!!');
    }else{
        data.forEach((ele, idx, data)=>{
            if(idx+1 !== data.length)
                console.log(idx+1+" "+ele);
        })
    }
}