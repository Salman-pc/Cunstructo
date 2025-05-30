import React, { useContext, useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { addCategoryApi, deleteCategoryApi, getCategoryApi, updateCategoryApi } from "../../services/allApi";
import serverUrl from "../../services/serverUrl";
import { displaycategoryContext } from "../../Context/OtherPurpuseContextApi";
import addImage from '../../assets/addImage.jpg'
import { toast } from "react-toastify";

function AddCategory() {

  const { setCategoryResponse, setaddsandCatogoryResponse } = useContext(displaycategoryContext)
  const [imageadd, setimageadd] = useState()
  const [CategoryData, setCategoryData] = useState({ categoryname: "", categoryimg: "" })
  const [editingCategory, setEditingCategory] = useState(null);
  const [getAllCategorydata, setgetAllCategorydata] = useState()

  useEffect(() => {
    if (CategoryData?.categoryimg instanceof File) {
      const imageUrl = URL.createObjectURL(CategoryData?.categoryimg);
      setimageadd(imageUrl)
    }
    else if (CategoryData.categoryimg) {
      setimageadd(`${serverUrl}/uploads/${CategoryData.categoryimg}`);
    }

  }, [CategoryData.categoryimg])

  useEffect(() => {

    getAllcategory()

  }, [])


  // get all category api
  const getAllcategory = async () => {
    try {
      const result = await getCategoryApi()
      console.log("API response:", result.data); // Add this line
      setgetAllCategorydata(result.data)
      setaddsandCatogoryResponse(result.data)
      setCategoryResponse(result.data)
      
    } catch (error) {
      console.log("API error:", error);
    }
  }

  const handleAddOrUpdateCategory = async (e) => {
    e.preventDefault()
    const { categoryname, categoryimg } = CategoryData


    if (categoryname && categoryimg) {

      if (editingCategory) {

        const id = editingCategory._id

        const reqbody = new FormData()
        reqbody.append("categoryname", categoryname)
        imageadd ? reqbody.append("categoryimg", categoryimg) : reqbody.append("categoryimg", editingCategory.categoryimg)

        const reqheader = {
          "Content-type": "multipart/form-data"
        }

        try {
          const result = await updateCategoryApi(id, reqbody, reqheader)

          setgetAllCategorydata(result.data)
          setaddsandCatogoryResponse(result.data)
          if(result.status>=200&&result.status<=300){
            toast.success("successfully updated catogory!!")
            getAllcategory()
          }
         

        } catch (error) {
          console.log(error);

        }

        setEditingCategory(null);
      } else {

        const reqbody = new FormData()
        reqbody.append("categoryname", categoryname)
        reqbody.append("categoryimg", categoryimg)

        const reqheader = {
          "Content-type": "multipart/form-data"
        }

        try {

          const result = await addCategoryApi(reqbody, reqheader)

          if (result.status >= 200 && result.status <= 300) {
            toast.success("successfully Added catogory!!")
            getAllcategory()
          }

        } catch (error) {
          console.log(error);

        }
      }
      setimageadd("")
      setCategoryData({ categoryname: "", categoryimg: "" })
    }
    else {
      toast.warning("please compleate ")
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const result = await deleteCategoryApi(id)
      
      if (result.status >= 200 && result.status <= 300) {
        getAllcategory()
        toast.success("successfully removed catogory!!")
      }
    } catch (error) {
      console.log(error);

    }
  };

  const handleEditCategory = (cat) => {
    setCategoryData({ categoryname: cat.categoryname, categoryimg: cat.categoryimg })
    setimageadd(`${serverUrl}/uploads/${cat.categoryimg}`);
    toast.success("catogory selected")
    setEditingCategory(cat);

  };

  return (
    <div className="bg-white rounded-2xl md:pt-40 pt-24 w-full max-w-7xl mx-auto">
      <h2 className="text-2xl md:mt-3 font-semibold text-gray-800 mb-4">
        {editingCategory ? "Edit Category" : "Add Category"}
      </h2>

      <div className="flex flex-col items-center space-y-4">

        <div className="w-[300px] h-[250px] flex justify-center  bg-blue-600 rounded-md p-10">
          <label htmlFor="fileInput" className="cursor-pointer ">
            <img src={imageadd ? imageadd : addImage} alt="Category" className="border w-[190px] h-full object-fill rounded-full shadow-md" />
          </label>
        </div>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setCategoryData({ ...CategoryData, categoryimg: e.target.files[0] })}
        />

        <input
          type="text"
          value={CategoryData.categoryname}
          onChange={(e) => setCategoryData({ ...CategoryData, categoryname: e.target.value })}
          placeholder="Enter category name"
          className="md:w-md  px-4 mt-5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={(e) => handleAddOrUpdateCategory(e)}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
        >
          {editingCategory ? "Update Category" : "Add Category"}
        </button>

      </div>

      {/* Category List */}
      <div className="mt-6 flex flex-col justify-center">
        {getAllCategorydata?.length > 0 ?
          <ul className="space-y-4 w-full">

            {getAllCategorydata?.map((item, index) => (
              <li key={index} className="flex items-center justify-between  p-3 bg-gray-100 rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <img src={`${serverUrl}/uploads/${item.categoryimg}`} alt="" className="w-16 h-16 object-cover rounded" />
                  <span className="font-medium text-gray-800">{item.categoryname}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCategory(item)}
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(item._id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))
            }

          </ul>
          : <div>item not found </div>}
      </div>
    </div>
  );
}

export default AddCategory;