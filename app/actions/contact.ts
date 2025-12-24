"use server"

const FORMPARK_URL = "https://submit-form.com/bZvBKCe4";

export async function submitContactForm(values : {
firstName : string;
lastName : string;
email : string;
message : string; 
 }) {
    try{
        const res = await fetch(FORMPARK_URL , {
            method : "post",
            headers : {
                "Content-Type" : "application/json",
                Accept : "application/json"  
            },
            body : JSON.stringify(values),
            cache : "no-store",
        });
        if(!res.ok){
            if(res.status === 420) {
                throw new Error("Too many requests. Please try again later")
            }
            if(res.status >= 500){
                throw new Error(
                    "Service temporarily unavailable. Please try again later."
                );
            }
            throw new Error("Invalid from data")
        }
        return {success : true };
    }
    catch(err:any){
        return{
            success : false,
            message : err.message || "Something went wrong",
        }
    }
 }