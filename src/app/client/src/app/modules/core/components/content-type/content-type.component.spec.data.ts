export const mockData = {
  formData: [
    {
      'index': 0,
      'title': 'frmelmnts.tab.courses',
      'desc': 'frmelmnts.tab.courses',
      'menuType': 'Content',
      'contentType': 'course',
      'isEnabled': true,
      'theme': {
        'baseColor': '',
        'textColor': '',
        'supportingColor': ''
      },
      'search': {
        'facets': ['topic', 'purpose', 'medium', 'gradeLevel', 'subject', 'channel'],
        'fields': [],
        'filters': {
          'contentType': [
            'Course'
          ]
        }
      },
      anonumousUserRoute: {
        route: '/explore-course',
        queryParam: 'course'
      },
      loggedInUserRoute: {
        route: '/learn',
        queryParam: 'course'
      },
      limit: 20,
    },
    {
      'index': 1,
      'title': 'frmelmnts.lbl.textbooks',
      'desc': 'frmelmnts.lbl.textbooks',
      'menuType': 'Content',
      'contentType': 'textbook',
      'isEnabled': true,
      'theme': {
        'baseColor': '',
        'textColor': '',
        'supportingColor': ''
      },
      'search': {
        'facets': ['board', 'gradeLevel', 'subject', 'medium', 'contentType', 'concepts'],
        'fields': ['name', 'appIcon', 'mimeType', 'gradeLevel', 'identifier', 'medium',
          'pkgVersion', 'board',
          'subject', 'resourceType', 'contentType', 'channel', 'organisation'],
        'filters': {
          'contentType': [
            'TextBook'
          ]
        }
      },
      anonumousUserRoute: {
        route: '/explore',
        queryParam: 'textbook'
      },
      loggedInUserRoute: {
        route: '/resources',
        queryParam: 'textbook'
      },
      limit: 100,
    },
    {
      'index': 2,
      'title': 'frmelmnts.tab.all',
      'desc': 'frmelmnts.tab.all',
      'menuType': 'Content',
      'isEnabled': false,
      'theme': {
        'baseColor': '',
        'textColor': '',
        'supportingColor': ''
      },
      'search': {
        'facets': ['board', 'gradeLevel', 'subject', 'medium', 'contentType', 'concepts'],
        'fields': ['name', 'appIcon', 'mimeType', 'gradeLevel', 'identifier',
          'medium', 'pkgVersion', 'board', 'subject', 'resourceType', 'contentType', 'channel', 'organisation'],
        'filters': {
          'contentType': [
            'Collection', 'TextBook', 'LessonPlan', 'Resource', 'SelfAssess', 'PracticeResource', 'LearningOutcomeDefinition', 'ExplanationResource', 'CurriculumCourse', 'Course'
          ]
        }
      },
      limit: 100
    }
  ]
};

