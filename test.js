let arr =  [2,7,11,15] 
// let arr = [3,2,4]
let trg =  9


var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {  
            if (nums[i] + nums[j] === target){
                return [i, j]
            }
        }
    }
}

var resultArray = twoSum(arr, trg)
console.log(resultArray);