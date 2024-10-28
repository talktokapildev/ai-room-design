"use client";
import React, { useState, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalReq from "./_components/AdditionalReq";
import CustomLoading from "./_components/CustomLoading";
import AiOutputDialog from "../_components/AiOutputDialog";
import { Button } from "@/components/ui/button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import axios from "axios";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";

function CreateNew() {
  const { user } = useUser();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiOutputImage, setAiOutputImage] = useState();
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [orgImage, setOrgImage] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    console.log(formData);
  };
  const GenerateAiImage = async () => {
    setLoading(true);
    const rawImageUrl = await SaveRawImageToFirebase();
    const result = await axios.post("/api/redesign-room", {
      imageUrl: rawImageUrl,
      roomType: formData?.roomType,
      designType: formData?.designType,
      additionalReq: formData?.additionalReq,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(result.data);
    setAiOutputImage(result.data.result); // Output Image Url
    await updateUserCredits();

    setOpenOutputDialog(true);
    setLoading(false);
  };

  const SaveRawImageToFirebase = async () => {
    // Save Raw File Image to Firebase
    const fileName = `${Date.now()}_raw.png`;
    const imageRef = ref(storage, `room-redesign/${fileName}`);

    await uploadBytes(imageRef, formData.image).then((resp) => {
      console.log("File Uploaded...");
    });

    // Uploaded File Image URL
    const downloadUrl = await getDownloadURL(imageRef);
    console.log(downloadUrl);
    setOrgImage(downloadUrl);
    return downloadUrl;
  };

  /**
   * Update the user credits
   * @returns
   */
  const updateUserCredits = async () => {
    const result = await db
      .update(usersTable)
      .set({
        credits: userDetail?.credits - 1,
      })
      .returning({ id: usersTable.id });

    if (result) {
      setUserDetail((prev) => ({
        ...prev,
        credits: userDetail?.credits - 1,
      }));
      return result[0].id;
    }
  };

  return (
    <div>
      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-center text-gray-500">
        Transform any room with a click. Select a space, choose a style, and
        watch as AI instantly reimagines your environment.
      </p>
      <div
        className="grid grid-cols-1 md:grid-cols-2 
         mt-10 gap-10"
      >
        {/* Image Selection  */}
        <ImageSelection
          selectedImage={(value) => onHandleInputChange(value, "image")}
        />
        {/* Form Input Section  */}
        <div>
          {/* Room type  */}
          <RoomType
            selectedRoomType={(value) => onHandleInputChange(value, "roomType")}
          />
          {/* Design Type  */}
          <DesignType
            selectedDesignType={(value) =>
              onHandleInputChange(value, "designType")
            }
          />
          {/* Additonal Requirement TextArea (Optional) */}
          <AdditionalReq
            additionalRequirementInput={(value) =>
              onHandleInputChange(value, "additionalReq")
            }
          />
          {/* Button To Generate Image  */}
          <Button className="w-full mt-5" onClick={GenerateAiImage}>
            Generate
          </Button>
          <p className="text-sm text-gray-400 mb-52">
            NOTE: 1 Credit will use to redesign your room
          </p>
        </div>
      </div>
      <CustomLoading loading={loading} />
      <AiOutputDialog
        aiImage={aiOutputImage}
        orgImage={orgImage}
        closeDialog={() => setOpenOutputDialog(false)}
        openDialog={openOutputDialog}
      />
    </div>
  );
}

export default CreateNew;
