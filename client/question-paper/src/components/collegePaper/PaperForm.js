

const PaperForm = ({handleChange}) => {

  return (
    <div>
        <form className="grid grid-cols-2 gap-2 ml-4">
          <div className="flex items-center gap-2  col-span-3">
            <label className="w-30 font-semibold">College Name:</label>
            <input
              className="border p-2 rounded flex-1 "
              name="collegeName"
              type="text"
              placeholder="Enter College Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-30 font-semibold">Academic Session:</label>
            <input
              className="border p-2 rounded flex-1"
              name="academicSession"
              type="text"
              placeholder="Enter Academic Session"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-30 font-semibold">Date:</label>
            <input
              className="border p-2 rounded flex-1"
              name="date"
              type="date"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-30 font-semibold">Time Allotted:</label>
            <input
              className="border p-2 rounded flex-1"
              name="timeAllotted"
              type="text"
              placeholder="Enter Time"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-30 font-semibold">Paper Name:</label>
            <input
              className="border p-2 rounded flex-1"
              name="paperName"
              type="text"
              placeholder="Enter Paper Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-30 font-semibold">Paper Code:</label>
            <input
              className="border p-2 rounded flex-1"
              name="paperCode"
              type="text"
              placeholder="Enter Paper Code"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-30 font-semibold">Total Marks:</label>
            <input
              className="border p-2 rounded flex-1"
              name="totalMarks"
              type="text"
              placeholder="Enter Total Marks"
              onChange={handleChange}
              required
            />
          </div>
        </form>
    </div>
  )
}

export default PaperForm