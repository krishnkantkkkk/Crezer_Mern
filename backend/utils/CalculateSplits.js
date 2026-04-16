function CalculateSplits(members){
    let positives = [];
    let negatives = [];
    members.forEach((member) =>{
        if(member.amount > 0) positives.push([member.amount, member._id]);
        else if( member.amount < 0) negatives.push([member.amount, member._id]);
    })

    let ans = []
    while(positives.length){
        positives.sort((x, y)=>x[0] - y[0]);
        negatives.sort((x, y)=>x[0] - y[0]);
        let prefixSum = [0];
        positives.forEach(element => {
            prefixSum.push(prefixSum[prefixSum.length-1] + element[0]);
        });
        const iterative_range = range(prefixSum, negatives);
        if(iterative_range.length > 0){
            for(let i = iterative_range[0]; i<=iterative_range[1]; i++){
                ans.push([negatives[0][1], positives[i][1], positives[i][0]])
            }
            positives.splice(iterative_range[0], iterative_range.length);
            negatives.shift();
        }
        else{
            if(Math.abs(negatives[0][0]) > positives[positives.length-1][0]){
                let removed = positives.pop();
                ans.push([negatives[0][1], removed[1], removed[0]]);
                negatives[0][0] += removed[0];
            }
            else{
                let removed = negatives.shift();
                ans.push([removed[1], positives[positives.length-1][1], Math.abs(removed[0])]);
                positives[positives.length-1][0] += removed[0];
            }
        }
    }
    return ans;
}

const search = (array, target, r)=>{
    let l = 0;
    while(l <= r){
        const mid = l + Math.floor((r-l)/2);
        if(array[mid] == target) return mid;
        else if(array[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}

const range = (prefixSum, negatives)=>{
    let size = 1e9;
    let ans = [];
    for(let i = 1; i<prefixSum.length; i++){
        const target = prefixSum[i] - Math.abs(negatives[0][0]);
        if(target >= 0){
            let idx = search(prefixSum, target, i-1);
            if(idx != -1 && size > (i-idx)){
                size = i-idx;
                ans = [idx, i-1];
            }
        }
    }
    return ans;
}

export default CalculateSplits;