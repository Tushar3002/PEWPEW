import { useForm } from "react-hook-form";

import { useEffect } from "react";
import { addManufacturer, getManufacturerDataById, updateManufacturer } from "../../api/Manufacturer/manufacturer";

export const ManufacturerModal=({show,id,onClose,onSuccess})=>{
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
          name: "",
        },
      });
    
      useEffect(()=>{
        if(!show) return;
        if(isEditable){
          fetchDataById(id)
        }else{
          reset({
            name:"",
            description:""
          })
        }
      },[show,id,isEditable,reset])
    
      const fetchDataById = async (id) => {
          try {
            const res = await getManufacturerDataById(id);
            console.log(" Id", res.data);
      
            reset({
              name:res.data.name,
              description:res.data.description
            });
    
          } catch (error) {
            console.log(error.response);
          }
        };
    
      const onSubmit = async (data) => {
        try {
          const body = {
            name: data.name,
            description: data.description,
            id: isEditable && id ? id : null,
          };
    
          if (isEditable) {
            await updateManufacturer(id,body);
          } else {
            await addManufacturer(body);
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
                  {isEditable ? "Edit Manufacturer" : "Add Manufacturer"}
                </h5>
    
                <button type="button" className="btn-close" onClick={onClose} />
              </div>
    
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-body">
                  {/* Badge Name */}
                  <div className="mb-3">
                    <label className="form-label">
                      Manufacturer Name <span className="text-danger">*</span>
                    </label>
    
                    <input
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      {...register("name", {
                        required: "Manufacturer name is required.",
                      })}
                    />
    
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name.message}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Description
                    </label>
    
                    <textarea
                    
                      rows={4}
                      className={`form-control ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      {...register("description")}
                    />
    
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
    

