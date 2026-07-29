import React, { useEffect, useState } from "react";
import { getCountryCode, venueTypesDropDown } from "../../api/Common/commonApi";
import { getGunDropDownAll } from "../../api/Gun/gunApi";
import { getEndUserDropDown } from "../../api/EndUsers/endUserApi";
import { getVenueById } from "../../api/EndUsers/endUserViewApi";
import { useForm, Controller } from "react-hook-form";
import { DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";
import "../../assets/css/dropdown.css";
import { addVenueData, updateVenueData } from "../../api/Venue/venueApi";

import LocationPicker from "../Map/LocationPicker";

function VenueModal({ venueId, show, onClose, onSuccess }) {
  const isEditMode = Boolean(venueId);
  const [venueDropdown, setVenueDropdown] = useState([]);
  const [endUsers, setEndUsers] = useState([]);
  const [gunDropdown, setGunDropDown] = useState([]);
  const [countryCodeData, setCountryCodeData] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImageName, setExistingImageName] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      userId: "",
      venueName: "",
      description: "",
      website: "",
      phone: "",
      address: "",
      venueType: "",
      guns: [],
      countryCode: "",
      countryCodeName: "",
      venueImage: null,
    },
  });

  useEffect(() => {
    if (!show) return;

    getVenueDropDown();
    getGunDropDown();
    getCountryCodeData();
    getEndUsersList();

    if (isEditMode) {
      getVenueByIdData();
    } else {
      reset({
        userId: "",
        venueName: "",
        description: "",
        website: "",
        phone: "",
        address: "",
        venueType: "",
        guns: [],
        countryCode: "",
        countryCodeName: "",
      });

      setImagePreview("");
      setExistingImageName("");
      setLatitude(null);
      setLongitude(null);
    }
  }, [show, venueId]);

  const getVenueDropDown = async () => {
    try {
      const res = await venueTypesDropDown();
      console.log(res.data);
      setVenueDropdown(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getGunDropDown = async () => {
    try {
      const res = await getGunDropDownAll();
      console.log(res.data);
      setGunDropDown(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getCountryCodeData = async () => {
    try {
      const res = await getCountryCode();
      //   console.log(res.data);
      setCountryCodeData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEndUsersList = async () => {
    try {
      const res = await getEndUserDropDown();
      // console.log(res.data);
      setEndUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVenueByIdData = async () => {
    try {
      const res = await getVenueById(venueId);

      console.log(res.data);

      reset({
        userId: res.data.userId,
        venueName: res.data.venueName,
        description: res.data.description,
        website: res.data.website,
        phone: res.data.phone,
        address: res.data.address,
        venueType: res.data.venueType,
        guns: res.data.guns?.map((gun) => gun.gunId) || [],
        countryCode: res.data.countryCode || "",
        countryCodeName: res.data.countryCodeName || "",
      });

      setExistingImageName(res.data.imageName || "");
      setImagePreview(res.data.imageFullPath || "");

      setLatitude(res.data.latitude ?? null);
      setLongitude(res.data.longitude ?? null);
    } catch (error) {
      console.log(error.response);
    }
  };

  const onSubmit = async (data) => {
    try {
      const body = {
        address: data.address || "",
        countryCode: data.countryCode || "",
        countryCodeName: data.countryCodeName || "",
        description: data.description || "",
        gunIds: data.guns || [],
        imageName: existingImageName || "",
        latitude,
        longitude,
        phone: data.phone || "",
        userId: data.userId,
        venueName: data.venueName,
        venueType: data.venueType,
        website: data.website || "",
      };

      if (isEditMode) {
        await updateVenueData(venueId, body);
      } else {
        await addVenueData(body);
      }

      // Refresh parent table
      await onSuccess?.();

      // Close modal
      onClose();
    } catch (error) {
      console.log(isEditMode ? "Update Error:" : "Add Error:", error?.response);
    }
  };

  const handleLocationSelect = async (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);

    const geocoder = new google.maps.Geocoder();

    const response = await geocoder.geocode({
      location: { lat, lng },
    });

    if (response.results?.length) {
      setValue("address", response.results[0].formatted_address, {
        shouldValidate: true,
      });
    }
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show d-block venue-edit-modal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditMode ? "Edit Venue" : "Add Venue"}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-3">
                  {/* Username */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Select Username <span className="text-danger">*</span>
                    </label>

                    <select
                      className={`form-select ${
                        errors.userId ? "is-invalid" : ""
                      }`}
                      disabled={isEditMode}
                      {...register("userId", {
                        required: "Username is required",
                      })}
                    >
                      <option value="">Select Username</option>

                      {endUsers.map((user) => (
                        <option key={user.key} value={user.key}>
                          {user.userName}
                        </option>
                      ))}
                    </select>

                    {errors.userId && (
                      <div className="invalid-feedback">
                        {errors.userId.message}
                      </div>
                    )}
                  </div>

                  {/* Venue Name */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Venue Name <span className="text-danger">*</span>
                    </label>

                    <input
                      className="form-control"
                      {...register("venueName", {
                        required: "Venue Name is required",
                      })}
                    />

                    <small className="text-danger">
                      {errors.venueName?.message}
                    </small>
                  </div>

                  {/* Venue Image */}
                  <div className="col-md-6">
                    <label className="form-label">Venue Image</label>

                    <input type="file" className="form-control" disabled />

                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Venue"
                          className="rounded border"
                          style={{
                            width: "120px",
                            height: "90px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="col-md-6">
                    <label className="form-label">Description</label>

                    <textarea
                      rows={4}
                      className="form-control"
                      {...register("description")}
                    />
                  </div>

                  {/* Website */}
                  <div className="col-md-6">
                    <label className="form-label">Website</label>

                    <input className="form-control" {...register("website")} />
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="fw-semibold">
                        Contact Number <span className="danger-color">*</span>
                      </label>

                      <div className="d-flex align-items-center gap-2">
                        <Controller
                          name="countryCode"
                          control={control}
                          rules={{
                            required: "Country Code is required",
                          }}
                          render={({ field }) => (
                            <select
                              className={`form-select ${
                                errors.countryCode ? "is-invalid" : ""
                              }`}
                              style={{
                                width: "110px",
                                minWidth: "110px",
                              }}
                              value={field.value ?? ""}
                              onChange={(e) => {
                                const selectedCode = e.target.value;

                                const selectedCountry = countryCodeData.find(
                                  (country) =>
                                    country.phoneInternationalCode ===
                                    selectedCode,
                                );

                                field.onChange(selectedCode);

                                setValue(
                                  "countryCodeName",
                                  selectedCountry?.countryCode || "",
                                );
                              }}
                            >
                              <option value="">Code</option>

                              {countryCodeData.map((country) => (
                                <option
                                  key={country.countryId}
                                  value={country.phoneInternationalCode}
                                >
                                  {country.phoneInternationalCode}
                                </option>
                              ))}
                            </select>
                          )}
                        />

                        {/* {errors.countryCode && (
                                          <div className="invalid-feedback d-block">{errors.countryCode.message}</div>
                                        )} */}

                        <input
                          id="phone"
                          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                          {...register("phone", {
                            required: "Contact Number is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Enter 10 digits",
                            },
                          })}
                        />
                        <div className="invalid-feedback">
                          {errors.phone?.message}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="col-12">
                    <label className="form-label">Address</label>

                    <textarea
                      rows={3}
                      className="form-control"
                      {...register("address")}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Location</label>

                    <LocationPicker
                      latitude={latitude}
                      longitude={longitude}
                      onLocationChange={(location) => {
                        setLatitude(location.latitude);
                        setLongitude(location.longitude);

                        if (location.address) {
                          setValue("address", location.address, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Venue Type <span className="text-danger">*</span>
                    </label>

                    <Controller
                      name="venueType"
                      control={control}
                      rules={{
                        required: "Venue Type is required",
                      }}
                      render={({ field }) => (
                        <DropDownList
                          data={venueDropdown}
                          textField="description"
                          dataItemKey="id"
                          value={
                            venueDropdown.find(
                              (venue) => venue.id === Number(field.value),
                            ) || null
                          }
                          onChange={(e) => {
                            field.onChange(e.value?.id ?? "");
                          }}
                          // defaultItem={{
                          //   id: "",
                          //   description: "Select Venue Type",
                          // }}
                          className={errors.venueType ? "k-invalid" : ""}
                        />
                      )}
                    />

                    {errors.venueType && (
                      <div className="text-danger small mt-1">
                        {errors.venueType.message}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 ">
                    <div className="form-label">
                      <label className="form-label">Gun</label>

                      <Controller
                        name="guns"
                        control={control}
                        render={({ field }) => (
                          <MultiSelect
                            className="venue-gun-multiselect form-control"
                            data={gunDropdown}
                            textField="gunName"
                            dataItemKey="gunId"
                            value={gunDropdown.filter((gun) =>
                              field.value?.includes(gun.gunId),
                            )}
                            onChange={(e) => {
                              field.onChange(e.value.map((gun) => gun.gunId));
                            }}
                            placeholder="Select Guns"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer px-0 mt-4">
                  <button
                    type="button"
                    className="btn main-btn border-btn"
                    onClick={onClose}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn main-btn w-auto">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default VenueModal;
