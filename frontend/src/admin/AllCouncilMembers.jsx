import React, { useState, useEffect } from 'react'
import { Edit, Trash2, CheckCircle2, Eye, EyeOff, Loader2, RefreshCw, Plus, Building2, Briefcase } from 'lucide-react'
import { getCouncilMembers, deleteCouncilMember, updateCouncilMember } from '../services/api'

export default function AllCouncilMembers({ onNavigate }) {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')
  const [msg, setMsg] = useState('')

  // Edit modal state
  const [editingMember, setEditingMember] = useState(null)
  const [editName, setEditName] = useState('')
  const [editRole, setEditRole] = useState('')
  const [editFullRole, setEditFullRole] = useState('')
  const [editCompanyName, setEditCompanyName] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const data = await getCouncilMembers()
      setMembers(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return
    setActionLoading(id)
    try {
      await deleteCouncilMember(id)
      setMembers(members.filter(m => m._id !== id))
      setMsg(`Council member "${name}" deleted!`)
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading('')
    }
  }

  const openEditModal = (member) => {
    setEditingMember(member)
    setEditName(member.name)
    setEditRole(member.role)
    setEditFullRole(member.fullRole || '')
    setEditCompanyName(member.companyName)
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    if (!editingMember) return
    setIsSaving(true)
    try {
      const res = await updateCouncilMember(editingMember._id, {
        name: editName,
        role: editRole,
        fullRole: editFullRole,
        companyName: editCompanyName,
      })
      setMembers(members.map(m => m._id === editingMember._id ? res.data : m))
      setEditingMember(null)
      setMsg('Council Member updated successfully!')
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="w-full text-left space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
            All Council Executive Members
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage profiles displayed under the "Current Executive Council" section on the About Us page
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchMembers}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => onNavigate('add-council')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Member</span>
          </button>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>{msg}</span>
        </div>
      )}

      {/* Members Grid */}
      {loading ? (
        <div className="p-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading council members...</p>
        </div>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <h3 className="text-base font-bold text-gray-700">No Council Members Found</h3>
          <button
            onClick={() => onNavigate('add-council')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow mt-4"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Executive</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member, idx) => (
            <div
              key={member._id || idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between"
            >
              {/* Photo Frame */}
              <div className="relative h-56 bg-slate-900 overflow-hidden">
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top" 
                />
                <span className="absolute top-3 right-3 bg-[#E37263] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                  {member.role}
                </span>
              </div>

              {/* Details */}
              <div className="p-5 space-y-2.5">
                <div>
                  <h3 className="text-base font-black text-[#1E293B]">
                    {member.name}
                  </h3>
                  <div className="text-xs font-bold text-[#E37263] mt-0.5">
                    {member.role}
                  </div>
                </div>

                <div className="text-xs text-gray-600 space-y-1 pt-1 border-t border-gray-100">
                  {member.fullRole && (
                    <p className="font-medium text-gray-700">
                      {member.fullRole}
                    </p>
                  )}
                  <p className="text-gray-500 font-normal">
                    {member.companyName}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => openEditModal(member)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit Member"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(member._id, member.name)}
                    disabled={actionLoading === member._id}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                    title="Delete Member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-black text-[#1E293B] mb-5">
              Edit Council Executive Member
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Role</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
                >
                  <option value="President">President</option>
                  <option value="Vice President">Vice President</option>
                  <option value="Immediate Past President">Immediate Past President</option>
                  <option value="Past President">Past President</option>
                  <option value="Member">Member</option>
                  <option value="Advisor">Advisor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Corporate Title / Full Role</label>
                <input 
                  type="text" 
                  value={editFullRole}
                  onChange={(e) => setEditFullRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={editCompanyName}
                  onChange={(e) => setEditCompanyName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-bold shadow hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
