"use client";

import React from "react";
import { useForm } from "react-hook-form";

export default function CreatePetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log("data", data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Pet Name"
        {...register("name", { required: true, maxLength: 80 })}
      />
      <select {...register("Type", { required: true })}>
        <option value="DOG">Dog</option>
        <option value="CAT">Cat</option>
        <option value="BIRD">Bird</option>
        <option value="HAMSTER">Hamster</option>
        <option value="HORSE">Horse</option>
        <option value="OTHER">Other</option>
      </select>
      <input
        type="text"
        placeholder="Name of Owner"
        {...register("ownerName", { required: true, maxLength: 100 })}
      />
      <input
        type="datetime"
        placeholder="12/12/12"
        {...register("DOB", {
          required: true,
          pattern: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/i,
        })}
      />

      <input type="submit" />
    </form>
  );
}
