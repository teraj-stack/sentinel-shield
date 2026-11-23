import __vite__cjsImport0_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useEffect = __vite__cjsImport0_react["useEffect"];
export const DynamicHead = ({ seo }) => {
  useEffect(() => {
    if (seo.title) {
      document.title = seo.title;
    }
    const updateMeta = (selector, attrName, attrValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };
    const updateLink = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };
    if (seo.description) {
      updateMeta('meta[name="description"]', "name", "description", seo.description);
    }
    if (seo.keywords) {
      updateMeta('meta[name="keywords"]', "name", "keywords", seo.keywords);
    }
    updateMeta('meta[property="og:title"]', "property", "og:title", seo.ogTitle || seo.title);
    updateMeta('meta[property="og:description"]', "property", "og:description", seo.ogDescription || seo.description);
    updateMeta('meta[property="og:type"]', "property", "og:type", seo.ogType || "website");
    updateMeta('meta[property="og:locale"]', "property", "og:locale", "pl_PL");
    updateMeta('meta[property="og:site_name"]', "property", "og:site_name", "CML - Centrum Medycyny Laserowej");
    if (seo.canonicalUrl) {
      updateLink("canonical", seo.canonicalUrl);
    }
    let scriptTag = document.getElementById("cml-structured-data");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "cml-structured-data";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = seo.structuredDataJson;
  }, [seo]);
  return null;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkR5bmFtaWNIZWFkLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU2VvTWV0YVN0YXRlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgRHluYW1pY0hlYWRQcm9wcyB7XG4gIHNlbzogU2VvTWV0YVN0YXRlO1xufVxuXG5leHBvcnQgY29uc3QgRHluYW1pY0hlYWQ6IFJlYWN0LkZDPER5bmFtaWNIZWFkUHJvcHM+ID0gKHsgc2VvIH0pID0+IHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBVcGRhdGUgZG9jdW1lbnQgdGl0bGVcbiAgICBpZiAoc2VvLnRpdGxlKSB7XG4gICAgICBkb2N1bWVudC50aXRsZSA9IHNlby50aXRsZTtcbiAgICB9XG5cbiAgICAvLyBIZWxwZXIgdG8gdXBkYXRlIG1ldGEgdGFnIGJ5IG5hbWUgb3IgcHJvcGVydHlcbiAgICBjb25zdCB1cGRhdGVNZXRhID0gKHNlbGVjdG9yOiBzdHJpbmcsIGF0dHJOYW1lOiBzdHJpbmcsIGF0dHJWYWx1ZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpID0+IHtcbiAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgYXMgSFRNTE1ldGFFbGVtZW50IHwgbnVsbDtcbiAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YScpO1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjb250ZW50JywgY29udGVudCk7XG4gICAgfTtcblxuICAgIC8vIEhlbHBlciBmb3IgbGluayB0YWdzXG4gICAgY29uc3QgdXBkYXRlTGluayA9IChyZWw6IHN0cmluZywgaHJlZjogc3RyaW5nKSA9PiB7XG4gICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxpbmtbcmVsPVwiJHtyZWx9XCJdYCkgYXMgSFRNTExpbmtFbGVtZW50IHwgbnVsbDtcbiAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgncmVsJywgcmVsKTtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgfTtcblxuICAgIC8vIFVwZGF0ZSBNZXRhIERlc2NyaXB0aW9uXG4gICAgaWYgKHNlby5kZXNjcmlwdGlvbikge1xuICAgICAgdXBkYXRlTWV0YSgnbWV0YVtuYW1lPVwiZGVzY3JpcHRpb25cIl0nLCAnbmFtZScsICdkZXNjcmlwdGlvbicsIHNlby5kZXNjcmlwdGlvbik7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIE1ldGEgS2V5d29yZHNcbiAgICBpZiAoc2VvLmtleXdvcmRzKSB7XG4gICAgICB1cGRhdGVNZXRhKCdtZXRhW25hbWU9XCJrZXl3b3Jkc1wiXScsICduYW1lJywgJ2tleXdvcmRzJywgc2VvLmtleXdvcmRzKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgT3BlbiBHcmFwaCBUYWdzXG4gICAgdXBkYXRlTWV0YSgnbWV0YVtwcm9wZXJ0eT1cIm9nOnRpdGxlXCJdJywgJ3Byb3BlcnR5JywgJ29nOnRpdGxlJywgc2VvLm9nVGl0bGUgfHwgc2VvLnRpdGxlKTtcbiAgICB1cGRhdGVNZXRhKCdtZXRhW3Byb3BlcnR5PVwib2c6ZGVzY3JpcHRpb25cIl0nLCAncHJvcGVydHknLCAnb2c6ZGVzY3JpcHRpb24nLCBzZW8ub2dEZXNjcmlwdGlvbiB8fCBzZW8uZGVzY3JpcHRpb24pO1xuICAgIHVwZGF0ZU1ldGEoJ21ldGFbcHJvcGVydHk9XCJvZzp0eXBlXCJdJywgJ3Byb3BlcnR5JywgJ29nOnR5cGUnLCBzZW8ub2dUeXBlIHx8ICd3ZWJzaXRlJyk7XG4gICAgdXBkYXRlTWV0YSgnbWV0YVtwcm9wZXJ0eT1cIm9nOmxvY2FsZVwiXScsICdwcm9wZXJ0eScsICdvZzpsb2NhbGUnLCAncGxfUEwnKTtcbiAgICB1cGRhdGVNZXRhKCdtZXRhW3Byb3BlcnR5PVwib2c6c2l0ZV9uYW1lXCJdJywgJ3Byb3BlcnR5JywgJ29nOnNpdGVfbmFtZScsICdDTUwgLSBDZW50cnVtIE1lZHljeW55IExhc2Vyb3dlaicpO1xuXG4gICAgLy8gQ2Fub25pY2FsIGxpbmtcbiAgICBpZiAoc2VvLmNhbm9uaWNhbFVybCkge1xuICAgICAgdXBkYXRlTGluaygnY2Fub25pY2FsJywgc2VvLmNhbm9uaWNhbFVybCk7XG4gICAgfVxuXG4gICAgLy8gSW5qZWN0IEpTT04tTEQgU3RydWN0dXJlZCBEYXRhXG4gICAgbGV0IHNjcmlwdFRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbWwtc3RydWN0dXJlZC1kYXRhJykgYXMgSFRNTFNjcmlwdEVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghc2NyaXB0VGFnKSB7XG4gICAgICBzY3JpcHRUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdFRhZy5pZCA9ICdjbWwtc3RydWN0dXJlZC1kYXRhJztcbiAgICAgIHNjcmlwdFRhZy50eXBlID0gJ2FwcGxpY2F0aW9uL2xkK2pzb24nO1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHRUYWcpO1xuICAgIH1cbiAgICBzY3JpcHRUYWcudGV4dENvbnRlbnQgPSBzZW8uc3RydWN0dXJlZERhdGFKc29uO1xuXG4gIH0sIFtzZW9dKTtcblxuICByZXR1cm4gbnVsbDtcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBLFNBQWdCLGlCQUFpQjtBQU8xQixhQUFNLGNBQTBDLENBQUMsRUFBRSxJQUFJLE1BQU07QUFDbEUsWUFBVSxNQUFNO0FBRWQsUUFBSSxJQUFJLE9BQU87QUFDYixlQUFTLFFBQVEsSUFBSTtBQUFBLElBQ3ZCO0FBR0EsVUFBTSxhQUFhLENBQUMsVUFBa0IsVUFBa0IsV0FBbUIsWUFBb0I7QUFDN0YsVUFBSSxVQUFVLFNBQVMsY0FBYyxRQUFRO0FBQzdDLFVBQUksQ0FBQyxTQUFTO0FBQ1osa0JBQVUsU0FBUyxjQUFjLE1BQU07QUFDdkMsZ0JBQVEsYUFBYSxVQUFVLFNBQVM7QUFDeEMsaUJBQVMsS0FBSyxZQUFZLE9BQU87QUFBQSxNQUNuQztBQUNBLGNBQVEsYUFBYSxXQUFXLE9BQU87QUFBQSxJQUN6QztBQUdBLFVBQU0sYUFBYSxDQUFDLEtBQWEsU0FBaUI7QUFDaEQsVUFBSSxVQUFVLFNBQVMsY0FBYyxhQUFhLEdBQUcsSUFBSTtBQUN6RCxVQUFJLENBQUMsU0FBUztBQUNaLGtCQUFVLFNBQVMsY0FBYyxNQUFNO0FBQ3ZDLGdCQUFRLGFBQWEsT0FBTyxHQUFHO0FBQy9CLGlCQUFTLEtBQUssWUFBWSxPQUFPO0FBQUEsTUFDbkM7QUFDQSxjQUFRLGFBQWEsUUFBUSxJQUFJO0FBQUEsSUFDbkM7QUFHQSxRQUFJLElBQUksYUFBYTtBQUNuQixpQkFBVyw0QkFBNEIsUUFBUSxlQUFlLElBQUksV0FBVztBQUFBLElBQy9FO0FBR0EsUUFBSSxJQUFJLFVBQVU7QUFDaEIsaUJBQVcseUJBQXlCLFFBQVEsWUFBWSxJQUFJLFFBQVE7QUFBQSxJQUN0RTtBQUdBLGVBQVcsNkJBQTZCLFlBQVksWUFBWSxJQUFJLFdBQVcsSUFBSSxLQUFLO0FBQ3hGLGVBQVcsbUNBQW1DLFlBQVksa0JBQWtCLElBQUksaUJBQWlCLElBQUksV0FBVztBQUNoSCxlQUFXLDRCQUE0QixZQUFZLFdBQVcsSUFBSSxVQUFVLFNBQVM7QUFDckYsZUFBVyw4QkFBOEIsWUFBWSxhQUFhLE9BQU87QUFDekUsZUFBVyxpQ0FBaUMsWUFBWSxnQkFBZ0Isa0NBQWtDO0FBRzFHLFFBQUksSUFBSSxjQUFjO0FBQ3BCLGlCQUFXLGFBQWEsSUFBSSxZQUFZO0FBQUEsSUFDMUM7QUFHQSxRQUFJLFlBQVksU0FBUyxlQUFlLHFCQUFxQjtBQUM3RCxRQUFJLENBQUMsV0FBVztBQUNkLGtCQUFZLFNBQVMsY0FBYyxRQUFRO0FBQzNDLGdCQUFVLEtBQUs7QUFDZixnQkFBVSxPQUFPO0FBQ2pCLGVBQVMsS0FBSyxZQUFZLFNBQVM7QUFBQSxJQUNyQztBQUNBLGNBQVUsY0FBYyxJQUFJO0FBQUEsRUFFOUIsR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUVSLFNBQU87QUFDVDsiLCJuYW1lcyI6W119