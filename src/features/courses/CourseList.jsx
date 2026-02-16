import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputClass from "../../atoms/InputClass";
import {
  fetchCourses,
  createCourse,
  editCourse,
  removeCourse,
} from "./courseSlice";

const CourseList = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.courses);

  // State untuk form input
  const [form, setForm] = useState({
    title: "",
    tutorName: "",
    tutorJob: "",
    tutorPhoto: "",
    thumbnail: "",
    price: "",
    deskripsi: "",
  });

  // State untuk track course yang sedang diedit
  const [editingCourse, setEditingCourse] = useState(null);

  // Fetch data saat komponen pertama kali load
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Handle submit tambah atau update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCourse) {
      // UPDATE
      dispatch(editCourse({ id: editingCourse.id, updatedCourse: form }));
      setEditingCourse(null);
    } else {
      // CREATE
      dispatch(createCourse(form));
    }

    // Reset form setelah tambah / edit
    setForm({
      title: "",
      tutorName: "",
      tutorJob: "",
      tutorPhoto: "",
      thumbnail: "",
      price: "",
      deskripsi: "",
    });
  };

  // Handle edit
  const handleEdit = (course) => {
    setEditingCourse(course);
    setForm(course); // isi form dengan data lama
  };

  // Handle delete
  const handleDelete = (id) => {
    dispatch(removeCourse(id));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-10 md:p-6">
      {/* FORM Tambah / Edit */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 mt-[28px] border-[1px] border-[#f1f1f1] flex flex-col gap-2 bg-white p-4 rounded max-w-md mx-auto"
      >
        <div>
          <h2 className="text-center text-2xl font-semibold mb-2 text-[#222325] font-poppins">
            {" "}
            Manajemen Video Belajar
          </h2>
          <p className="text-center font-[500] mb-2 text-[#333333]/68 text-[14px] font-dm-sans">
            {" "}
            Input Data Course Disini!
          </p>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-[400] text-[#333333]/68 font-dm-sans">
            Course Title<span className="text-red-500 pl-1">*</span>
          </label>
          <InputClass
            type="text"
            placeholder=""
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-[400] text-[#333333]/68 font-dm-sans">
            Tutor Name<span className="text-red-500 pl-1">*</span>
          </label>
          <InputClass
            type="text"
            placeholder=""
            value={form.tutorName}
            onChange={(e) => setForm({ ...form, tutorName: e.target.value })}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-[400] text-[#333333]/68 font-dm-sans">
            Tutor Job <span className="text-red-500 pl-1">*</span>
          </label>
          <InputClass
            type="text"
            placeholder=""
            value={form.tutorJob}
            onChange={(e) => setForm({ ...form, tutorJob: e.target.value })}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-[400] text-[#333333]/68 font-dm-sans">
            Tutor URL Photo<span className="text-red-500 pl-1">*</span>
          </label>
          <InputClass
            type="url"
            placeholder=""
            value={form.tutorPhoto}
            onChange={(e) => setForm({ ...form, tutorPhoto: e.target.value })}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-[400] text-[#333333]/68 font-dm-sans">
            URL Thumbnail<span className="text-red-500 pl-1">*</span>
          </label>
          <InputClass
            type="url"
            placeholder=""
            value={form.thumbnail}
            onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-[400] text-[#333333]/68 font-dm-sans">
            Price<span className="text-red-500 pl-1">*</span>
          </label>
          <InputClass
            type="number"
            placeholder=""
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-[400] text-[#333333]/68 font-dm-sans">
            Description<span className="text-red-500 pl-1">*</span>
          </label>
          <InputClass
            type="textarea"
            placeholder=""
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className={`text-white m-5 font-dm-sans text-[14px] px-4 py-2 rounded ${
            editingCourse
              ? "bg-yellow-500 hover:bg-yellow-600 font-poppins"
              : "bg-[#3ECF4C] hover:bg-[#249e31] font-poppins"
          }`}
        >
          {editingCourse ? "Update Course" : "Tambah Course"}
        </button>
      </form>

      {/* Daftar Course */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:p-20">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-row md:flex-col bg-white border border-gray-200 rounded-xl p-4 shadow-md transition hover:shadow-lg"
          >
            <img
              src={item.thumbnail}
              alt="thumbnail"
              className="w-[100px] h-[100px] md:w-full md:h-40 rounded-lg object-cover"
            />

            {/* Konten */}
            <div className="flex flex-col flex-1 mt-0 md:mt-4 md:ml-0 ml-4">
              <h2 className="text-[16px] md:text-[18px] font-poppins font-[600] font-bold mt-2">
                {item.title}
              </h2>
              <p className="hidden md:block md:text-[16px] text-[#333333]/68 font-medium font-dm-sans mt-2">
                {item.deskripsi}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <img
                  src={item.tutorPhoto}
                  alt="tutor"
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />

                <div>
                  <p className="text-[14px] md:text-[16px] text-[#222325] font-medium font-dm-sans">
                    {item.tutorName}
                  </p>
                  <p className="text-[12px] md:text-[14px] text-[#333333]/68 font-dm-sans">
                    {item.tutorJob}
                  </p>
                </div>
              </div>

              <p className="text-[#3ecf4c] text-[18px] md:text-[24px] font-bold mt-2">
                Rp {parseInt(item.price).toLocaleString()}
              </p>

              <div className="md:mt-4 mt-3 flex gap-2 justify-end md:justify-start">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 font-poppins"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 font-poppins"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
