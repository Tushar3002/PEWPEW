import { useForm } from "react-hook-form";
import { addProhibitedWords, getProhibitedWordsById, updateProhibitedWords } from "../../api/ProhibitedWords/prohibitedwords";
import { useEffect } from "react";

export const ProhibitedWordsModal = ({ show, onClose, id, onSuccess }) => {
  const isEditable = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    // setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      description: "",
      words: "",
    },
  });

  useEffect(()=>{
    if(!show) return;
    if(isEditable){
      fetchDataById(id)
    }else{
      reset({
        words:"",
        description:""
      })
    }
  },[show,id,isEditable,reset])

  const fetchDataById = async (id) => {
      try {
        const res = await getProhibitedWordsById(id);
        console.log(" Id", res.data);
  
        reset({
          words:res.data.words,
          description:res.data.description
        });

      } catch (error) {
        console.log(error.response);
      }
    };

  const onSubmit = async (data) => {
    try {
      const body = {
        words: data.words,
        description: data.description,
        id: isEditable && id ? id : null,
      };

      console.log("Badge body:", body);

      if (isEditable) {
        await updateProhibitedWords(body);
      } else {
        await addProhibitedWords(body);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  if (!show) return null;
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEditable ? "Edit Prohibited Words" : "Add Prohibited Words"}
            </h5>

            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              {/* Badge Name */}
              <div className="mb-3">
                <label className="form-label">
                  Prohibited Words<span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className={`form-control ${errors.words ? "is-invalid" : ""}`}
                  placeholder="Enter badge name"
                  {...register("words", {
                    required: "Prohibited Words is required.",
                  })}
                />

                {errors.words && (
                  <div className="invalid-feedback">{errors.words.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Description <span className="text-danger">*</span>
                </label>

                <textarea
                
                  rows={4}
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  {...register("description", {
                    required: "Description is required.",
                  })}
                />

                {errors.description && (
                  <div className="invalid-feedback">
                    {errors.description.message}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn main-btn border-btn"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn main-btn w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : isEditable ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
