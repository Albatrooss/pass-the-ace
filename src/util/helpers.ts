import { Card } from './types';

export const properNoun = (str: string) => {
    let wordArr = str.split(' ');
    return wordArr
        .map(word => word[0].toUpperCase() + word.substr(1))
        .join(' ');
};

export const orderUserIds = (userIds: string[], dealerId: string): string[] => {
    let end: string[] = [];
    let ordered: string[] = [];
    let found = false;
    userIds.forEach(uId => {
        if (!found) {
            end.push(uId);
            if (uId !== dealerId) {
                return;
            }
            found = true;
            return;
        }
        ordered.push(uId);
    });
    return [...ordered, ...end];
};

export const splitUsers = (userIds: string[], userId: string) => {
    let before: string[] = [];
    let after: string[] = [];
    // let ordered = orderUserIds(userIds, dealerId);
    let found = false;
    userIds.forEach(uId => {
        if (!found) {
            if (uId !== userId) {
                before.unshift(uId); // display row-reverse
                return;
            }
            found = true;
            return;
        }
        after.push(uId);
    });
    return { before, after };
};

export const isKing = (c: Card | null): boolean => {
    if (!c) return false;
    return ['sK', 'dK', 'hK', 'cK'].includes(c);
};
