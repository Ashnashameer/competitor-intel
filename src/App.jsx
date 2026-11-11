import React, { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ExcelSlicersPanel } from './components/ExcelSlicersPanel';
import { OverviewDashboard } from './components/OverviewDashboard';
import { CompetitorDirectory } from './components/CompetitorDirectory';
import { OrganisationProfilePage } from './components/OrganisationProfilePage';
import { CyberSquareDashboard } from './components/CyberSquareDashboard';
import { CompetitorComparison } from './components/CompetitorComparison';
import { CoursesDatabase } from './components/CoursesDatabase';
import { CollaborationOpportunities } from './components/CollaborationOpportunities';
import { ResearchSources } from './components/ResearchSources';
import { SegmentView } from './components/SegmentView';
import { AddEditCompetitorModal } from './components/AddEditCompetitorModal';
import { MystEdgeLogo } from './components/MystEdgeLogo';
import { WelcomePage } from './components/WelcomePage';
import { CompetitorCategoriesPage } from './components/CompetitorCategoriesPage';
import { CategoryCompetitorListPage } from './components/CategoryCompetitorListPage';
import { CompetitiveStrategyModule } from './components/CompetitiveStrategyModule';
import { MarketTrendsModule } from './components/MarketTrendsModule';
import { CompetitorActivityTracker } from './components/CompetitorActivityTracker';
import { Menu } from 'lucide-react';

function MainApp() {
  const { addOrganisation, updateOrganisation, deleteOrganisation, organisations } = useData();

  // Navigation State with URL hash synchronization
  const [activeTab, setActiveTabState] = useState(() => {
    try {
      const hash = window.location.hash.replace('#', '').trim();
      if (['schools', 'colleges', 'corporate', 'other_partnerships'].includes(hash)) {
        return 'category-detail';
      }
      if (hash.startsWith('org-') || hash.startsWith('profile-')) {
        return 'organisation-detail';
      }
      return hash || 'welcome';
    } catch {
      return 'welcome';
    }
  });

  const [selectedCategory, setSelectedCategory] = useState(() => {
    try {
      const hash = window.location.hash.replace('#', '').trim();
      if (['schools', 'colleges', 'corporate', 'other_partnerships'].includes(hash)) {
        return hash;
      }
      return 'schools';
    } catch {
      return 'schools';
    }
  });

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    try {
      if (tab === 'welcome') {
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } else if (tab === 'category-detail') {
        window.location.hash = selectedCategory;
      } else if (tab === 'organisation-detail' && selectedOrg) {
        window.location.hash = `profile-${selectedOrg.id}`;
      } else {
        window.location.hash = tab;
      }
    } catch {}
  };

  React.useEffect(() => {
    const handleHashChange = () => {
      try {
        const hash = window.location.hash.replace('#', '').trim();
        if (hash) {
          if (['schools', 'colleges', 'corporate', 'other_partnerships'].includes(hash)) {
            setSelectedCategory(hash);
            setActiveTabState('category-detail');
          } else if (hash.startsWith('org-') || hash.startsWith('profile-')) {
            const orgId = hash.replace('profile-', '');
            const targetOrg = organisations.find(o => o.id === orgId);
            if (targetOrg) {
              setSelectedOrg(targetOrg);
              setActiveTabState('organisation-detail');
            }
          } else {
            setActiveTabState(hash);
          }
        }
      } catch {}
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [organisations]);

  const [previousTab, setPreviousTab] = useState('categories');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSlicerOpen, setIsSlicerOpen] = useState(false);

  // Selected organisation for the dedicated full profile page
  const [selectedOrg, setSelectedOrg] = useState(() => {
    try {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash.startsWith('org-') || hash.startsWith('profile-')) {
        const orgId = hash.replace('profile-', '');
        return organisations.find(o => o.id === orgId) || null;
      }
    } catch {}
    return null;
  });
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setActiveTab('category-detail');
  };

  const handleBackToCategories = () => {
    setActiveTab('categories');
  };

  const handleSelectOrg = (org) => {
    setPreviousTab(activeTab);
    setSelectedOrg(org);
    setActiveTab('organisation-detail');
  };

  const handleBackToOrganisations = () => {
    setSelectedOrg(null);
    if (selectedCategory) {
      setActiveTab('category-detail');
    } else {
      setActiveTab(previousTab || 'categories');
    }
  };

  const handleEditOrg = (org) => {
    setEditingOrg(org);
    setIsAddEditModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditingOrg(null);
    setIsAddEditModalOpen(true);
  };

  const handleSaveOrg = (orgData) => {
    if (editingOrg) {
      updateOrganisation(orgData);
      if (selectedOrg && selectedOrg.id === orgData.id) {
        setSelectedOrg(orgData);
      }
    } else {
      addOrganisation(orgData);
    }
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      // 1. PRIMARY SECOND PAGE: COMPETITOR CATEGORIES (4 Cards Only)
      case 'categories':
      case 'directory':
      case 'organisations':
        return (
          <CompetitorCategoriesPage 
            onSelectCategory={handleSelectCategory}
            onNavigateHome={() => setActiveTab('welcome')}
          />
        );

      // 2. CATEGORY-SPECIFIC COMPETITOR INTELLIGENCE LIST
      case 'category-detail':
        return (
          <CategoryCompetitorListPage 
            categoryId={selectedCategory}
            onBackToCategories={handleBackToCategories}
            onSelectOrg={handleSelectOrg}
            onNavigateHome={() => setActiveTab('welcome')}
          />
        );

      // Direct Category Route Shortcuts
      case 'schools':
        return (
          <CategoryCompetitorListPage 
            categoryId="schools"
            onBackToCategories={handleBackToCategories}
            onSelectOrg={(org) => {
              setSelectedCategory('schools');
              handleSelectOrg(org);
            }}
            onNavigateHome={() => setActiveTab('welcome')}
          />
        );

      case 'colleges':
        return (
          <CategoryCompetitorListPage 
            categoryId="colleges"
            onBackToCategories={handleBackToCategories}
            onSelectOrg={(org) => {
              setSelectedCategory('colleges');
              handleSelectOrg(org);
            }}
            onNavigateHome={() => setActiveTab('welcome')}
          />
        );

      case 'corporate':
        return (
          <CategoryCompetitorListPage 
            categoryId="corporate"
            onBackToCategories={handleBackToCategories}
            onSelectOrg={(org) => {
              setSelectedCategory('corporate');
              handleSelectOrg(org);
            }}
            onNavigateHome={() => setActiveTab('welcome')}
          />
        );

      case 'other_partnerships':
        return (
          <CategoryCompetitorListPage 
            categoryId="other_partnerships"
            onBackToCategories={handleBackToCategories}
            onSelectOrg={(org) => {
              setSelectedCategory('other_partnerships');
              handleSelectOrg(org);
            }}
            onNavigateHome={() => setActiveTab('welcome')}
          />
        );

      // Dedicated Profile Dossier
      case 'organisation-detail':
        return (
          <OrganisationProfilePage 
            org={selectedOrg} 
            onBack={handleBackToOrganisations}
            onEdit={handleEditOrg}
            categoryContext={selectedCategory}
          />
        );

      // General Analysis & Directories
      case 'overview':
        return <OverviewDashboard onSelectOrg={handleSelectOrg} setActiveTab={setActiveTab} />;
      
      case 'all-competitors':
      case 'master-directory':
        return (
          <CompetitorDirectory 
            onSelectOrg={handleSelectOrg} 
            onEditOrg={handleEditOrg} 
            onOpenAddModal={handleOpenAddModal} 
          />
        );

      case 'courses':
        return <CoursesDatabase />;

      case 'compare':
      case 'comparison':
        return <CompetitorComparison onSelectOrg={handleSelectOrg} />;

      case 'collaboration':
      case 'partnerships':
      case 'opportunities':
        return <CollaborationOpportunities />;

      case 'sources':
        return <ResearchSources />;

      // Strategic Intelligence Modules
      case 'strategy':
        return (
          <CompetitiveStrategyModule 
            onSelectOrg={handleSelectOrg}
            onNavigateHome={() => setActiveTab('welcome')}
          />
        );

      case 'trends':
        return (
          <MarketTrendsModule 
            onNavigateHome={() => setActiveTab('welcome')}
          />
        );

      case 'activities':
        return (
          <CompetitorActivityTracker 
            onSelectOrg={handleSelectOrg}
            onNavigateHome={() => setActiveTab('welcome')}
          />
        );

      // Legacy fallback handlers to ensure no broken routes
      case 'higher_secondary':
      case 'training_institutes':
      case 'agencies_edtech':
        return (
          <SegmentView 
            segmentId={activeTab} 
            onSelectOrg={handleSelectOrg} 
            onEditOrg={handleEditOrg} 
            onOpenAddModal={handleOpenAddModal} 
          />
        );

      default:
        return (
          <CompetitorCategoriesPage 
            onSelectCategory={handleSelectCategory}
            onNavigateHome={() => setActiveTab('welcome')}
          />
        );
    }
  };

  // Render Full-Screen Minimal Welcome Hero Page
  // When user clicks "Explore Edge", transitions to 'overview' (the command center)
  if (activeTab === 'welcome') {
    return (
      <WelcomePage 
        onExplore={(tab) => {
          if (['schools', 'colleges', 'corporate', 'other_partnerships'].includes(tab)) {
            setSelectedCategory(tab);
            setActiveTab('category-detail');
          } else {
            setActiveTab(tab || 'categories');
          }
        }} 
      />
    );
  }

  // Render Full-Screen Dedicated Cyber Square Competitor Intelligence Dashboard
  if (activeTab === 'organisation-detail' && selectedOrg && (selectedOrg.id === 'org-cybersquare-01' || (selectedOrg.name && selectedOrg.name.toLowerCase().includes('cyber square')))) {
    return (
      <CyberSquareDashboard 
        org={selectedOrg} 
        onBack={handleBackToOrganisations} 
      />
    );
  }

  return (
    <div className="flex h-screen bg-[#fbf9ff] overflow-hidden font-sans text-slate-900">
      {/* Category-Driven Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header Bar */}
        <div className="lg:hidden bg-[#0c0a1a] text-white px-4 py-2.5 flex items-center justify-between border-b border-[#241e3d]">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-white/10 cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div 
            onClick={() => setActiveTab('welcome')} 
            className="flex items-center gap-2 cursor-pointer"
            title="Return to Welcome Screen"
          >
            <MystEdgeLogo size="sm" showSub={false} />
          </div>
          <div className="w-6" />
        </div>

        {/* Global Application Header */}
        <Header 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCategory={selectedCategory}
          isSlicerOpen={isSlicerOpen}
          setIsSlicerOpen={setIsSlicerOpen}
          onOpenAddModal={handleOpenAddModal}
        />

        {/* Slide-out Advanced Filters Panel */}
        <ExcelSlicersPanel 
          isOpen={isSlicerOpen} 
          onClose={() => setIsSlicerOpen(false)} 
        />

        {/* Scrollable Main Workspace */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#fbf9ff]">
          <div className="max-w-7xl mx-auto pb-12">
            {renderActiveTabContent()}
          </div>
        </main>
      </div>

      {/* Add / Edit Organisation Modal */}
      <AddEditCompetitorModal
        isOpen={isAddEditModalOpen}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setEditingOrg(null);
        }}
        onSave={handleSaveOrg}
        initialData={editingOrg}
      />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
