import React, { useState, useEffect } from "react";
import { Trash2, Edit } from "lucide-react";
import { addADDSApi, deleteADDSApi, getADDSApi, updateADDSApi } from "../../services/allApi";
import serverUrl from "../../services/serverUrl";

function Add_Ads() {
    const [adImage, setAdImage] = useState();
    const [adsdata, setAdsdata] = useState({ adsimg: "", adsname: "" });
    const [editingAd, setEditingAd] = useState(null);
    const [getAds, setAllads] = useState([]);

    useEffect(() => {
        getAllAds();
    }, []);

    const getAllAds = async () => {
        try {
            const result = await getADDSApi();
            setAllads([...result.data]); // Ensure state updates properly
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (adsdata.adsimg instanceof File) {
            const imageUrl = URL.createObjectURL(adsdata.adsimg);
            setAdImage(imageUrl);
        } else if (adsdata.adsimg) {
            setAdImage(`${serverUrl}/uploads/${adsdata.adsimg}`);
        }
    }, [adsdata.adsimg]);

    const handleAddOrUpdateAd = async (e) => {
        e.preventDefault();
        const { adsname, adsimg } = adsdata;

        if (adsname && adsimg) {
            try {
                const reqbody = new FormData();
                reqbody.append("adsname", adsname.toLowerCase());
                reqbody.append("adsimg", adsimg);

                const reqheader = { 
                    "Content-type": "multipart/form-data" };

                if (editingAd) {
                    await updateADDSApi(editingAd._id, reqbody, reqheader);
                    setEditingAd(null);
                } else {
                    await addADDSApi(reqbody, reqheader);
                }

                getAllAds();
                setAdsdata({ adsname: "", adsimg: "" });
                setAdImage("");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleDeleteAd = async (id) => {
        try {
            await deleteADDSApi(id);
            getAllAds();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditAd = (ad) => {
        setAdsdata({ adsname: ad.adsname, adsimg: ad.adsimg });
        setAdImage(`${serverUrl}/uploads/${ad.adsimg}`);
        setEditingAd(ad);
    };

    return (
        <div className="bg-white md:pt-40 pt-24 w-full max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {editingAd ? "Edit Advertisement" : "Update Advertisement"}
            </h2>

            <div className="flex flex-col items-center space-y-4">
                <label className="cursor-pointer w-full p-8" onClick={() => document.getElementById("fileInput").click()}>
                    <img
                        src={adImage || "default-placeholder.jpg"}
                        alt="Ad Preview"
                        className="w-full border h-40 object-cover rounded-lg shadow-md"
                    />
                </label>

                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setAdsdata({ ...adsdata, adsimg: e.target.files[0] })}
                />

                <input
                    type="text"
                    value={adsdata.adsname}
                    onChange={(e) => setAdsdata({ ...adsdata, adsname: e.target.value })}
                    placeholder="Enter company name"
                    className="md:w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleAddOrUpdateAd}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
                >
                    {editingAd ? "Update Ad" : "Add Ad"}
                </button>
            </div>

            {/* Ads List */}
            <div className="mt-6">
                {getAds.length > 0 ? (
                    <ul className="space-y-4">
                        {getAds.map((item) => (
                            <li key={item._id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow">
                                <div className="flex items-center space-x-4">
                                    <img src={`${serverUrl}/uploads/${item.adsimg}`} alt="" className="w-16 h-16 object-cover rounded" />
                                    <span className="font-medium text-gray-800">{item.adsname}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditAd(item)}
                                        className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteAd(item._id)}
                                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>No Ads Found</div>
                )}
            </div>
        </div>
    );
}

export default Add_Ads;
