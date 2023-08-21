"use client";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/baseValue";

async function getData() {
  let token = await window.localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
}

const Profile = async () => {
  const { push } = useRouter();
  const userData = await getData();

  const checkUserData = () => {
    if ("message" in userData) {
      push("/auth");
      return;
    } else {
      push(`/account/${userData._id}`);
      return;
    }
  };

  return <>{checkUserData()}</>;
};

export default Profile;
