import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  X
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { TECHNOLOGIES, DURATIONS, DELIVERY_METHODS } from '../data/models';

export function CoursesDatabase() {
  const { 
    courses, 
    filteredCourses, 
    addCourse, 
    deleteCourse, 
    organisations 
  } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');

  // New course form state
  const [formData, setFormData] = useState({
    courseName: '',
    orgId: '',
    orgName: '',
    techCategory: 'Artificial Intelligence',
    duration: '6 Months',
    targetAudience: '',
    location: 'Kozhikode',
    deliveryMethod: 'Offline (Classroom / Lab)',
    skillsTaught: '',
    practicalProjects: '',
    internshipComponent: true,
    certification: true,
    placementAssistance: true,
    fees: '',
    sourceUrl: ''
  });

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!formData.courseName.trim()) {
      alert('Please enter a course name');
      return;
    }
    const matchingOrg = organisations.find(o => o.id === formData.orgId);
    const orgName = matchingOrg ? matchingOrg.name : formData.orgName || 'Independent Academy';
    addCourse({
      ...formData,
      orgName
    });
    setIsAddModalOpen(false);
    setFormData({
      courseName: '',
      orgId: '',
      orgName: '',
      techCategory: 'Artificial Intelligence',
      duration: '6 Months',
      targetAudience: '',
      location: 'Kozhikode',
      deliveryMethod: 'Offline (Classroom / Lab)',
      skillsTaught: '',
      practicalProjects: '',
      internshipComponent: true,
      certification: true,
      placementAssistance: true,
      fees: '',
      sourceUrl: ''
    });
  };

  const displayedCourses = courses.filter(course => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = (course.courseName || '').toLowerCase().includes(q);
      const matchOrg = (course.orgName || '').toLowerCase().includes(q);
      const matchTech = (course.techCategory || '').toLowerCase().includes(q);
      if (!matchName && !matchOrg && !matchTech) return false;
    }
    if (selectedTech !== 'All' && course.techCategory !== selectedTech) return false;
    if (selectedDuration !== 'All' && course.duration !== selectedDuration) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white rounded-2xl border border-purple-100 p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search */}
          <div className="flex-1 max-w-sm relative">
            <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses or providers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-purple-50/30 border border-purple-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all text-slate-900"
            />
          </div>

          {/* Filters & Actions */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="bg-purple-50/40 border border-purple-200/80 rounded-xl px-2.5 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
            >
              <option value="All">All Technologies</option>
              {TECHNOLOGIES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="bg-purple-50/40 border border-purple-200/80 rounded-xl px-2.5 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
            >
              <option value="All">All Durations</option>
              {DURATIONS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="ml-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 hover:from-violet-700 hover:to-indigo-800 rounded-xl shadow-xs transition-all shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Course</span>
            </button>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-purple-50 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            Showing <strong className="text-slate-900 font-semibold">{displayedCourses.length}</strong> programmes
          </span>
          <span className="text-purple-700 font-medium">
            Short-term, 3, 6 & 12-month curricula in Kerala
          </span>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-2xl border border-purple-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/40 text-slate-600 font-bold border-b border-purple-100">
              <tr>
                <th className="px-5 py-3.5">Course / Programme</th>
                <th className="px-4 py-3.5">Provider</th>
                <th className="px-4 py-3.5">Technology</th>
                <th className="px-4 py-3.5">Duration & Format</th>
                <th className="px-4 py-3.5">Estimated Fee</th>
                <th className="px-4 py-3.5">Internship / Support</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {displayedCourses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                    No courses match your filter criteria.
                  </td>
                </tr>
              ) : (
                displayedCourses.map(course => (
                  <tr key={course.id} className="hover:bg-purple-50/30 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-900">
                      <div className="font-bold text-slate-900">{course.courseName}</div>
                      {course.targetAudience && (
                        <div className="text-[11px] text-slate-400">{course.targetAudience}</div>
                      )}
                    </td>

                    <td className="px-4 py-3.5 text-slate-700 font-semibold">
                      {course.orgName}
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        {course.techCategory}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-slate-600">
                      <div className="font-medium text-slate-800">{course.duration}</div>
                      <div className="text-[11px] text-slate-400">{course.deliveryMethod}</div>
                    </td>

                    <td className="px-4 py-3.5 text-slate-900 font-bold">
                      {course.fees || 'On Inquiry'}
                    </td>

                    <td className="px-4 py-3.5 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        {course.internshipComponent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                            Internship
                          </span>
                        )}
                        {course.placementAssistance && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                            Placement
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {course.sourceUrl && (
                          <a
                            href={course.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 text-slate-400 hover:text-blue-600"
                            title="Open curriculum source"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete course "${course.courseName}"?`)) {
                              deleteCourse(course.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600"
                          title="Delete course"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-base font-bold text-slate-900 mb-1">Add Course or Programme</h2>
            <p className="text-xs text-slate-500 mb-4">Register a syllabus offering from a competitor or institution.</p>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Program in Generative AI"
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Provider Organisation</label>
                  <select
                    value={formData.orgId}
                    onChange={(e) => {
                      const id = e.target.value;
                      const o = organisations.find(x => x.id === id);
                      setFormData({ ...formData, orgId: id, orgName: o ? o.name : '' });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="">Select or Type Below</option>
                    {organisations.map(o => (
                      <option key={o.id} value={o.id}>{o.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Provider Name (Custom)</label>
                  <input
                    type="text"
                    placeholder="e.g. Tech Academy Calicut"
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Technology Category</label>
                  <select
                    value={formData.techCategory}
                    onChange={(e) => setFormData({ ...formData, techCategory: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {TECHNOLOGIES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {DURATIONS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estimated Fees</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹45,000"
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Delivery Method</label>
                  <select
                    value={formData.deliveryMethod}
                    onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {DELIVERY_METHODS.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold shadow-xs"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
