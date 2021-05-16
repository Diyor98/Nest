class FriendList {
    friends = [];

    addFriend(name) {
        this.friends.push(name);
        this.announceFriendship(name);
    }

    announceFriendship(name) {
        global.console.log(`${name} is not a friend!`);
    }

    removeFriend(name) {
        const index = this.friends.indexOf(name);
        
        if (index === -1 ) {
            throw new Error('Friend not found!');
        }

        this.friends.splice(index, 1);
    }
}

// tests
describe('FriendsList', () => {
    let friendList;

    beforeEach(() => {
        friendList = new FriendList();
    })


    it('initializes friends list', () => {
        expect(friendList.friends.length).toEqual(0);
    })

    it('it adds a friend to the list', () => {
        friendList.addFriend('Diyor');

        expect(friendList.friends.length).toEqual(1);
    })

    it('announces friendship', () => {
        friendList.announceFriendship = jest.fn();
        
        expect(friendList.announceFriendship).not.toHaveBeenCalled();
        friendList.addFriend('Diyor');
        expect(friendList.announceFriendship).toHaveBeenCalledWith('Diyor');
    })

    describe('removeFriend', () => {
        it('removes a friend from the list', () => {
            friendList.addFriend('Diyor');
            expect(friendList.friends[0]).toEqual('Diyor');
            friendList.removeFriend('Diyor');
            expect(friendList.friends[0]).toBeUndefined();
        });

        it('throws an error as friend does not exist.', () => {
            expect(() => friendList.removeFriend('Diyor')).toThrow(new Error('Friend not found!')); 
        });
    })
})