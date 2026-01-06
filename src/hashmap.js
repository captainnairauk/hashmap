class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0; 
  }

  
  _checkBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      // Using a specific message as requested by the prompt
      throw new Error("Trying to access index out of bounds");
    }
  }


  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }


  set(key, value) {
    const index = this.hash(key);
    this._checkBounds(index);

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        // Key exists, update value
        bucket[i][1] = value;
        return;
      }
    }

    // Key doesn't exist, add new pair
    bucket.push([key, value]);
    this.size++;
    this._resizeIfNecessary();
  }

  
  _resizeIfNecessary() {
    if (this.size / this.capacity > this.loadFactor) {
      const oldBuckets = this.buckets;
      this.capacity *= 2; // Double the capacity
      this.buckets = new Array(this.capacity).fill(null);
      this.size = 0; // Size will be recalculated during re-hashing

      oldBuckets.forEach((bucket) => {
        if (bucket) {
          bucket.forEach(([key, value]) => this.set(key, value));
        }
      });
    }
  }


  get(key) {
    const index = this.hash(key);
    this._checkBounds(index);

    const bucket = this.buckets[index];
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          return bucket[i][1];
        }
      }
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);
    this._checkBounds(index);

    const bucket = this.buckets[index];
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1); // Remove the element from the bucket
          this.size--;
          return true;
        }
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  keys() {
    const allKeys = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        bucket.forEach(([key, value]) => allKeys.push(key));
      }
    });
    return allKeys;
  }

  values() {
    const allValues = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        bucket.forEach(([key, value]) => allValues.push(value));
      }
    });
    return allValues;
  }

  entries() {
    const allEntries = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        bucket.forEach((pair) => allEntries.push(pair));
      }
    });
    return allEntries;
  }
}

export {HashMap};
