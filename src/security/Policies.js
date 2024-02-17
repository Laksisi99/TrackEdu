const policies = [
    {
        policyName: 'fetchAllData',
        role: ['ROLE.ADMIN', 'ROLE.STUDENT', 'ROLE.LECTURER', 'ROLE.ACADEMICSTAFF', 'ROLE.NONACADEMICSTAFF'],
        action: 'READ',
        attributes: ['*']
    },
    {
        policyName: 'fetchData',
        role: ['ROLE.ADMIN', 'ROLE.STUDENT', 'ROLE.LECTURER', 'ROLE.ACADEMICSTAFF', 'ROLE.NONACADEMICSTAFF'],
        action: 'READ',
        attributes: ['*']
    }
];

function getPolicyByName(policyName) {
    return policies.find(policy => policy.policyName === policyName);
}

module.exports = {
    policies, getPolicyByName
};