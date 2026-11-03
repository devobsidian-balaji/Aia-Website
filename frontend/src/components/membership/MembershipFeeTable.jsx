import React from "react";

export default function MembershipFeeTable({ rows = [] }) {
  if (!rows.length) return null;

  return (
    <div className="w-full rounded-lg bg-white p-3 shadow-[0_5px_25px_rgba(0,0,0,0.05)] sm:p-4">
      <h3 className="mb-3 text-sm font-bold text-[#263247]">
        Membership Fee Structure
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-[10px] sm:text-xs">
          <thead>
            <tr className="bg-[#FFF8F7] text-[#263247]">
              <th className="border border-[#F2DEDA] p-2">S. No.</th>
              <th className="border border-[#F2DEDA] p-2">
                Class of Membership
              </th>
              <th className="border border-[#F2DEDA] p-2">
                Annual Revenue (₹ Cr.)
              </th>
              <th className="border border-[#F2DEDA] p-2">
                Non-Refundable Admission Fee
              </th>
              <th className="border border-[#F2DEDA] p-2">
                Annual Subscription Fee
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.id ?? index}
                className="text-[#263247] transition-colors hover:bg-[#FFF9F8]"
              >
                <td className="border border-[#F2DEDA] p-2">
                  {index + 1}
                </td>

                <td className="border border-[#F2DEDA] p-2 font-semibold">
                  {row.membership}
                </td>

                <td className="border border-[#F2DEDA] p-2">
                  {row.revenue}
                </td>

                <td className="border border-[#F2DEDA] p-2">
                  {row.admission}/- + GST
                </td>

                <td className="border border-[#F2DEDA] p-2">
                  {row.subscription}/- + GST
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}