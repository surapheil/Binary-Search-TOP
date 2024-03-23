class Node{
    constructor(data,left = null,right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree{
    constructor(array){
        this.root = this.arrayBuild(array);
    }

    sorted = (array) => {
        let sorted = array.sort((a,b)=> a-b);
        let noDuplicate = [...new Set(sorted)];  // remove duplicates
        return noDuplicate;
    };

    arrayBuild = (arr) =>{
        let array = this.sorted(arr);
        if (!Array.isArray(array)){
            return null;
        }

        let mid =  Math.floor((array.length)/2);
        let node = new Node(array[mid]);

        node.left = this.arrayBuild(array.slice(0,mid));
        node.right = this.arrayBuild(array.slice(mid+1));
        return node;
    };

    insert = (root,key) =>{
        if (root === null){
            return new Node(key);
        }
        else{
            if (root.key < key){
                root.right = this.insert(root.right , key);
            }
            else if (root.key > key){
                root.left = this.insert(root.left , key);
            }
            else{
                return root;
            }
        }
        return root;
    }

    delete = (root,key) => {
        if (root === null) return root;

        //searching for the key
        if (root.key < key){
            root.right = this.delete(root.right , key)
        }else if(root.key > key){
            root.left = this.delete(root.left,key)
        }
        // when the key is found
        else{
            //when only having one child
            if (root.left == null)return root.right;
            else if(root.right == null) return root.left;
            //when having two children
            root.key = this.minValueNode(root.right).key ;//replace with minimum value of right subtree
            root.right = this.delete(root.right , root.key ) ;//recursively deleting the minimum value from the
        }
        return root;

        }

    find = (root,val) =>{
        if (root === null || root.value == val) return root;
        if(root.value < val) {
            return this.find(root.right,val)

        }
        else if(root.value > val){
            return this.find(root.left,val)
        }
        
    } 
    
    bfs = (root) => {
        let res = [];
        if (!root) return res;
        const queue = [root];
        while(queue.length > 0){
            let val = []
            for(let i=0;i<queue.length;i++){
                let node = queue.shift();
                val.push(node);
                if (node.left) queue.push(node.left);
                if(node.right) queue.push(node.right);
            }
            res.push(val);
        }
        return res;
    };

    preOrder = (root) => {
        if (!root) return [];
        let res = [];
        res.push(root.value !== undefined ? root.value : 'null');
        res = res.concat(this.preOrder(root.left));
        res = res.concat(this.preOrder(root.right));
        return res;
    }

    inOrder = (root) => {
        if(!root) return [];
        let res = [];
        res =  res.concat(this.inOrder(root.left));
        res.push((root.value !== undefined) ? root.value : "null");
        res = res.concat(this.inOrder(root.right));
        return  res;
    }

    postOrder = (root) =>{
        if(!root) return [];
        let res = [];
        res = res.concat(this.postOrder(root.left));
        res = res.concat(this.postOrder(root.right));
        res.push(root.value !== undefined ? root.value : 'null')
        return res;
    }

    height = (root) =>{
        if( !root ) return -1;
        let lHeight =  this.height(root.left);
        let rHeight =  this.height(root.right);

        return Math.max(lHeight,rHeight);

    }

    Depth = (root,target) => {
        if(!root || root == target){
            return root==target? 0:-1;
        }

        let lDepth = this.Depth(root.left , target );
        let rDepth = this.Depth(root.right , target );

        if(lDepth !== -1){
            return lDepth + 1;
        }
        if(rDepth !=-1 ){
            return rDepth+1;
        }
        return -1;
    }

    isBalanced = (root) => {
        if (root == null) return true;
        let hDiff = Math.abs((this.height(root.left)-this.height(root.right)));
        return (hDiff<=1 && this.isBalanced(root.left) && this.isBalanced(root.right));
    }

    rebalance = () =>{
        if  (!this.root) return null;
        let sorted = [...new Set(this.inOrder(this.root).sort((a,b)=>a-b))];
        this.root = this.arrayBuild(sorted);
    }


        
}
