import DOMPurify from 'dompurify';

// Calculate read time (rough estimate: 200 words per minute)
const calculateReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
};

export const formatDate = (date: Date, verbose=false) => {
    const defaultFormat: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }
    if (verbose) {
        defaultFormat.hour = 'numeric';
        defaultFormat.minute = '2-digit';
    }

    return new Intl.DateTimeFormat('en-US', defaultFormat).format(date);
}

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
