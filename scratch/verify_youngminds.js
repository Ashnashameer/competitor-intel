import { SEED_ORGANISATIONS, SEED_COURSES, SEED_PARTNERSHIPS, SEED_RESEARCH_SOURCES } from '../src/data/seedData.js';
import { 
  ORGANISATION_CATEGORY_RELATIONSHIPS, 
  getOrganisationsForCategory, 
  getCompetitorSkillCategories,
  getCategoryCompetitorCounts 
} from '../src/data/categoryRelationships.js';
import { SCHOOL_ORGANISATIONS, SCHOOL_PROGRAMMES } from '../src/data/schoolResearchData.js';
import { COMPETITIVE_STRATEGY_DATA, COMPETITOR_ACTIVITIES_DATA } from '../src/data/strategicIntelligenceData.js';

console.log('=== 1. VERIFY SEED ORGANISATIONS ===');
console.log('Total SEED_ORGANISATIONS count:', SEED_ORGANISATIONS.length);
const ymOrg = SEED_ORGANISATIONS.find(o => o.id === 'org-youngminds-01');
console.log('Found YoungMinds in SEED_ORGANISATIONS:', ymOrg ? ymOrg.name : 'MISSING');
console.log('YoungMinds category:', ymOrg?.category);
console.log('YoungMinds city:', ymOrg?.city);
console.log('YoungMinds address:', ymOrg?.address);
console.log('YoungMinds sampleProjects:', ymOrg?.sampleProjects);

console.log('\n=== 2. VERIFY CATEGORY COUNTS ===');
const counts = getCategoryCompetitorCounts(SEED_ORGANISATIONS);
console.log('Category Competitor Counts:', counts);

const schoolOrgs = getOrganisationsForCategory('schools', SEED_ORGANISATIONS);
console.log('Total Schools Competitors:', schoolOrgs.length);
console.log('Schools Competitor Names:');
schoolOrgs.forEach((o, i) => console.log(`  ${i+1}. ${o.name} (${o.id})`));

const collegeOrgs = getOrganisationsForCategory('colleges', SEED_ORGANISATIONS);
console.log('\nTotal Colleges Competitors:', collegeOrgs.length);
collegeOrgs.forEach(o => console.log(`  - ${o.name} (${o.id})`));

const corporateOrgs = getOrganisationsForCategory('corporate', SEED_ORGANISATIONS);
console.log('\nTotal Corporate Competitors:', corporateOrgs.length);
corporateOrgs.forEach(o => console.log(`  - ${o.name} (${o.id})`));

const otherOrgs = getOrganisationsForCategory('other', SEED_ORGANISATIONS);
console.log('\nTotal Other Competitors:', otherOrgs.length);
otherOrgs.forEach(o => console.log(`  - ${o.name} (${o.id})`));

console.log('\n=== 3. VERIFY YOUNGMINDS CATEGORY EXCLUSIVITY ===');
const inSchools = schoolOrgs.some(o => o.id === 'org-youngminds-01');
const inColleges = collegeOrgs.some(o => o.id === 'org-youngminds-01');
const inCorporate = corporateOrgs.some(o => o.id === 'org-youngminds-01');
const inOther = otherOrgs.some(o => o.id === 'org-youngminds-01');
console.log('YoungMinds strictly in Schools only:', inSchools && !inColleges && !inCorporate && !inOther);

console.log('\n=== 4. VERIFY SCHOOL SKILL CATEGORIES (TECHNICAL vs SOFT SKILLS) ===');
let techCount = 0;
let softCount = 0;
let dualCount = 0;

schoolOrgs.forEach(org => {
  const cats = getCompetitorSkillCategories(org);
  const isTech = cats.includes('Technical Skills');
  const isSoft = cats.includes('Soft Skills & Personal Development');
  if (isTech) techCount++;
  if (isSoft) softCount++;
  if (isTech && isSoft) dualCount++;
  console.log(`  - ${org.name.padEnd(35)} -> [${cats.join(', ')}]`);
});

console.log(`\nSkill Distribution Summary:`);
console.log(`  Technical Skills: ${techCount}`);
console.log(`  Soft Skills & Personal Development: ${softCount}`);
console.log(`  Dual (Both): ${dualCount}`);

console.log('\n=== 5. VERIFY SCHOOL RESEARCH DATA ===');
const ymSchoolOrg = SCHOOL_ORGANISATIONS.find(o => o.id === 'org-youngminds-01');
console.log('Found YoungMinds in SCHOOL_ORGANISATIONS:', ymSchoolOrg ? ymSchoolOrg.name : 'MISSING');
const ymProgs = SCHOOL_PROGRAMMES.filter(p => p.orgId === 'org-youngminds-01');
console.log('YoungMinds programmes in SCHOOL_PROGRAMMES:', ymProgs.length);
ymProgs.forEach(p => console.log(`  - ${p.id}: ${p.programmeName || p.name}`));

console.log('\n=== 6. VERIFY STRATEGIC INTELLIGENCE (BATTLECARD & ACTIVITIES) ===');
const ymBattlecard = COMPETITIVE_STRATEGY_DATA.find(b => b.orgId === 'org-youngminds-01');
console.log('Found YoungMinds battlecard:', ymBattlecard ? ymBattlecard.orgName : 'MISSING');
console.log('Battlecard Archetype:', ymBattlecard?.archetype);
console.log('Battlecard Threat Score:', ymBattlecard?.threatScore);
const ymActs = COMPETITOR_ACTIVITIES_DATA.filter(a => a.competitorId === 'org-youngminds-01');
console.log('YoungMinds activities:', ymActs.length);

console.log('\n=== 7. VERIFY SEED COURSES, PARTNERSHIPS, AND SOURCES ===');
const ymCourses = SEED_COURSES.filter(c => c.orgId === 'org-youngminds-01');
console.log('YoungMinds SEED_COURSES count:', ymCourses.length);
ymCourses.forEach(c => console.log(`  - ${c.id}: ${c.courseName}`));

const ymPartnerships = SEED_PARTNERSHIPS.filter(p => p.orgId === 'org-youngminds-01');
console.log('YoungMinds SEED_PARTNERSHIPS count:', ymPartnerships.length);
ymPartnerships.forEach(p => console.log(`  - ${p.id}: ${p.partnerName} (${p.partnershipType})`));

const ymSources = SEED_RESEARCH_SOURCES.filter(s => s.relatedOrg?.includes('YoungMinds') || s.sourceUrl?.includes('youngminds') || s.sourceUrl?.includes('p6rdj'));
console.log('YoungMinds SEED_RESEARCH_SOURCES count:', ymSources.length);
ymSources.forEach(s => console.log(`  - ${s.id}: ${s.sourceTitle}`));

console.log('\n=== 8. STRICT CONSTRAINT CHECK: sampleProjects ===');
const orgsWithProjects = SEED_ORGANISATIONS.filter(o => o.sampleProjects && o.sampleProjects.length > 0);
console.log('Organisations with non-empty sampleProjects:', orgsWithProjects.length, '(Expected: 0)');
