let Person={
    name:"sukram",
    address:{
        city:"kathmandu",
        postNo:"337"
    },
    print:()=>{
        console.log("i am printing");
    },
    profile:["linked","twitter","facebook"],
}
export default function LearningJavaScript(){
    return(
        <>
        <div>{Person.name}</div>
        <div>{Person.address.city}</div>
        <div>{Person.print()}</div>
        <div>{Person.profile[0]}</div>
        </>
    );

}