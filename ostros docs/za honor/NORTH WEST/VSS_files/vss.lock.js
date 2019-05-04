(function(angular) {

	angular.module("vss")

	/**
	 * An Lock to avoid asynchronis execution of something
	 */
	.factory('Lock', ['$timeout', '$q', function($timeout, $q){

		function LockImpl(){
			this.lockMap = {}; // Map of pending threads for a lock
		}

		LockImpl.prototype.getLock = function(key){
			if(this.lockMap[key] == null){
				this.lockMap[key] = [];
			}
			// Add ourself to the lock map
			this.lockMap[key][this.lockMap[key].length] = $q.defer();

			// If we are the only pending promise, we can resolve
			if(this.lockMap[key].length === 1){
				(function(resolveKey, self){
					$timeout(function(){
						self.lockMap[resolveKey][0].resolve();
					}, 1);
				})(key, this);
			}
			return this.lockMap[key][this.lockMap[key].length - 1].promise;
		};

		LockImpl.prototype._resolveNextLock = function(key){
			if(this.lockMap[key] != null){
				if(this.lockMap[key].length === 0){
					delete this.lockMap[key];
				}
				else{
					(function(resolveKey, self){
						$timeout(function(){
							self.lockMap[resolveKey][0].resolve();
						}, 1);
					})(key, this);
				}
			}
		};

		LockImpl.prototype.returnLock = function(key, returnData){
			this.lockMap[key].splice(0, 1);
			this._resolveNextLock(key);
			return $q.when(returnData);
		};

		return new LockImpl();
	}]);
})(angular);