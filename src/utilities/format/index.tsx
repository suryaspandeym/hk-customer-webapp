import DOMPurify from "dompurify";

export const formatHashtags = (inpStr: string) => DOMPurify.sanitize(inpStr.replace(/#(\S+)/g, '<a class="text-blue-500">#$1</a>'));
