export default function EmployeesTable({ employees }) {


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Age
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Password
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {emp._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {emp.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {emp.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {emp.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {emp.
password}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
              >
                No employee data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
