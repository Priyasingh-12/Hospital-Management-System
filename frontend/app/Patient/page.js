<main className="p-6 space-y-5">

 
  {/* Row 2 */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

    {/* Reason Distribution */}
    <div className="bg-green-50 rounded-xl p-5 shadow">
      <h3 className="font-bold mb-4">
        Reason Distribution
      </h3>

      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full border-[25px] border-indigo-400 flex items-center justify-center">
          <span className="text-sm text-gray-500">
            Disease
          </span>
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-400 mt-4">
        {reasonData.map((item) => (
          <span key={item.label}>
            {item.value}%
          </span>
        ))}
      </div>

    </div>


    {/* Appointments */}
    <div className="bg-blue-50 rounded-xl p-5 shadow">

      <h3 className="font-bold mb-4">
        Appointments
      </h3>

      <div className="space-y-3">

        {appointments.map((item, index) => (

          <div
            key={index}
            className="bg-white border-l-4 border-blue-500 rounded-lg p-3 flex justify-between"
          >

            <div>
              <p className="font-bold text-sm">
                {item.firstName} {item.lastName}
              </p>

              <p className="text-xs text-gray-400">
                {item.reason}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs font-semibold">
                {item.date}
              </p>

              <p className="text-xs text-gray-400">
                {item.time}
              </p>
            </div>

          </div>

        ))}

      </div>

    </div>


    {/* Medications */}
    <div className="bg-orange-50 rounded-xl p-5 shadow">

      <h3 className="font-bold mb-4">
        Medications
      </h3>

      <div className="space-y-3">

        {medications.map((med, index) => (

          <div
            key={index}
            className="bg-white border-l-4 border-orange-400 rounded-lg p-3 flex justify-between items-center"
          >

            <p className="font-bold text-sm">
              {med.name}
            </p>

            <div className="text-right">
              <p className="text-xs font-semibold">
                {med.dose}
              </p>

              <p className="text-xs text-gray-400">
                {med.schedule}
              </p>
            </div>

          </div>

        ))}

      </div>

    </div>

  </div>

</main>