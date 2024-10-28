import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const { user } = await req.json();
  //console.log("user", user);
  try {
    const userInfo = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user?.primaryEmailAddress.emailAddress));
    //.run();
    //console.log("userInfo", userInfo);
    if (userInfo.length === 0) {
      const saveResult = await db
        .insert(usersTable)
        .values({
          name: user?.fullName,
          email: user?.primaryEmailAddress.emailAddress,
          imageUrl: user?.imageUrl,
        })
        .returning({ usersTable });
      return NextResponse.json({ result: saveResult[0].usersTable });
    }
    return NextResponse.json({ result: userInfo[0] });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
  //return NextResponse.json({ result: user });
}
