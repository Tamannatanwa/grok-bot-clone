import { NextRequest, NextResponse } from "next/server";
import {authOptions} from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next";
import { users } from "@/db/schema";
import { db } from "@/db";

export async function POST(req:NextRequest){

    const session = await getServerSession(authOptions)

    if(!session?.user?.email){
        return NextResponse.json({error:"Unauthorized"}, {status:401})
    }

    try{
        const result = await db.insert(users).values({
            name :session?.user?.name,
            email:session?.user?.email,
        }).onConflictDoNothing({
            target: users.email,
        })
        .returning()  
        
        if (result.length === 0) {
            return NextResponse.json({error:"User already exists"}, {status:200})
        }

        return NextResponse.json({message:"User created successfully", user:result[0]}, {status:201})

    }
    catch(err){
        return NextResponse.json({error:"Internal Server Error"}, {status:500})
    }

}

