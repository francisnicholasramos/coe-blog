import DOMPurify from 'dompurify';

// Calculate read time (rough estimate: 200 words per minute)
const calculateReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min(s) read`;
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',  
        day: 'numeric',  
    });
};

const formatText = (html: string, renderHtml: boolean = false): string => {
    const sanitized = DOMPurify.sanitize(html);

    if (renderHtml) return sanitized;

    const doc = new DOMParser().parseFromString(sanitized, 'text/html');
    return doc.body.textContent || '';
};

export const helpers = {
    formatDate,
    formatText,
    calculateReadTime
}
