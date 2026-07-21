import React, { useEffect, useState } from "react";
import { getCountryCode, venueTypesDropDown } from "../../api/Common/commonApi";
import { getGunDropDownAll } from "../../api/Gun/gunApi";
import { getEndUserDropDown } from "../../api/EndUsers/endUserApi";
import { getVenueById } from "../../api/EndUsers/endUserViewApi";
import { useForm } from "react-hook-form";

function VenueEditModal({ venueId, show, onClose }) {
  if (!show) return null;
  const [venueDropdown, setVenueDropdown] = useState([]);
//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: { ...initialUserForm },
//   });
  useEffect(() => {
    getVenueDropDown();
    getGunDropDown();
    getCountryCodeData();
    getEndUsersList();
    getVenueByIdData();
  }, []);
  const getVenueDropDown = async () => {
    try {
      const res = await venueTypesDropDown();
      // console.log(res.data);
      setVenueDropdown(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getGunDropDown = async () => {
    try {
      const res = await getGunDropDownAll();
      //   console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getCountryCodeData = async () => {
    try {
      const res = await getCountryCode();
      //   console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEndUsersList = async () => {
    try {
      const res = await getEndUserDropDown();
      //   console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVenueByIdData = async () => {
    try {
      const res = await getVenueById(venueId);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">Edit Venue</h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body"></div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default VenueEditModal;
