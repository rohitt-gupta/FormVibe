"use client";
import React, { useEffect, useState } from "react";
import { useFormVibeContext } from "@/contexts/FormVibeContextProvider";
import { renderFinalFormElements } from "@/lib/renderHelpers";

function FormPage({ params }) {
  const [formElements, setFormElements] = useState([]);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formId, setFormId] = useState();

  const { retrieveFormBySlug } = useFormVibeContext();

  useEffect(() => {
    fetchForm();
  }, []);

  const fetchForm = async () => {
    const result = await retrieveFormBySlug(params?.id);
    console.log(result?.documents);

    if (result?.documents.length === 0) {
      toast("No form slug found");
      router.push("/app");
    }

    const doc = result?.documents?.[0];
    setFormName(doc?.form_name ?? "");
    setFormDescription(doc?.form_description ?? "");
    let cols = JSON.parse(doc?.form_columns);
    setFormElements(cols);
    setFormId(doc?.$id);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 pt-28 flex flex-col gap-20">
      <div className="flex w-full gap-6">
        <div>
          <img
            src="/assets/icons/imageUploadIcon.svg"
            alt="Upload Banner Image"
          />
          <input type="file" id="formIcon" className="hidden" />
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            value={formName}
            placeholder="Enter form name here"
            onChange={(e) => {
              setFormName(e.target.value);
              setInitialRender(false);
            }}
            className="outline-none py-2 font-semibold text-gray-600 text-lg"
          />

          <input
            type="text"
            value={formDescription}
            placeholder="Enter some description for the form (optional)"
            onChange={(e) => {
              setFormDescription(e.target.value);
              setInitialRender(false);
            }}
            className="text-gray-500 w-full outline-none py-2"
          />
        </div>
      </div>
      {formElements.map((el, index) =>
        renderFinalFormElements(el?.name, el?.label)
      )}
      <div className="flex justify-center">
        <button className="btn-primary w-40 p-3">Submit</button>
      </div>
    </div>
  );
}

export default FormPage;
