
export const hit = [0]

export const hitboxMatch = (x1, x2, y1, y2, w1, w2, h1, h2) => {
 
    if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2) {
        hit[0] = 1
       
    }
}
