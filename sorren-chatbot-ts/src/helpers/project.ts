export interface SegmentData {
    text: string;
    iconClass: string;
    listId: string;
  }
  
  export const segmentsData: Record<string, SegmentData> = {
    segment1: { text: 'UX Design', iconClass: 'fa-brands fa-figma', listId: 'list1' },
    segment2: { text: 'AI/ML', iconClass: 'fa-robot', listId: 'list2' },
    segment3: { text: 'Sorren', iconClass: 'fa-user', listId: 'list3' },
    segment4: { text: 'Full-Stack', iconClass: 'fa-laptop-code', listId: 'list4' },
  };
  
  // Store selected segment data (text and icon)
  export let selectedSegmentData: { text: string; iconClass: string | null } = { text: 'Hover', iconClass: null };
  
  // Function to start the game with fade-out and fade-in transitions
  export function startGame(): void {
    const startScreen = document.getElementById("startScreen") as HTMLElement;
    const selectorScreen = document.getElementById("selectorScreen") as HTMLElement;
    const segments = document.querySelectorAll(".segment") as NodeListOf<HTMLElement>;
    const mobileButtonContainer = document.querySelector(".mobile-button-container") as HTMLElement;
  
    // Set initial offset positions for segments
    segments[0].style.transform = "translate(-70px,-70px)";
    segments[1].style.transform = "translate(70px, -70px)";
    segments[2].style.transform = "translate(70px, 70px)";
    segments[3].style.transform = "translate(-70px, 70px)";
  
    // Fade out the start screen and show the selector screen
    startScreen.style.opacity = "0";
    setTimeout(() => {
      startScreen.style.display = "none"; // Hide start screen
      selectorScreen.style.display = "block"; // Show selector screen
      selectorScreen.style.opacity = "1"; // Fade in selector screen
      mobileButtonContainer.style.display = "flex";
  
      // Trigger animation for each segment
      setTimeout(() => {
        segments.forEach(segment => {
          segment.style.transform = "translate(0, 0)";
          segment.style.opacity = "1";
          mobileButtonContainer.style.display = "flex";
        });
      }, 100); // Delay to trigger the transform and opacity transition
    }, 1000); // Delay to match the CSS transition duration
  }
  
  // Function to update center text with optional Font Awesome icon
  export function updateCenterText(newText: string, iconClass: string | null): void {
    const centerTextOverlay = document.getElementById("centerTextOverlay") as HTMLElement;
    centerTextOverlay.style.opacity = "0";
  
    setTimeout(() => {
      if (iconClass) {
        centerTextOverlay.innerHTML = `<i class="fa ${iconClass}"></i>`;
      } else {
        centerTextOverlay.innerHTML = `<p>${newText}</p>`;
      }
      centerTextOverlay.style.opacity = "1";
    }, 500);
  }
  
  // Function to reset the center text to the default or selected segment text and icon
  export function resetCenterText(): void {
    const { text, iconClass } = selectedSegmentData;
    updateCenterText(text, iconClass);
  }
  
  // Function to handle segment selection and display corresponding list
  export function selectSegment(segmentId: string): void {
    const { text, iconClass, listId } = segmentsData[segmentId];
    document.querySelectorAll(".segment").forEach(segment => segment.classList.remove("selected"));
    const selectedSegment = document.getElementById(segmentId) as HTMLElement;
    selectedSegment.classList.add("selected");
  
    // Update selected segment data with both text and icon
    selectedSegmentData = { text, iconClass };
  
    // Update center text with the selected segment's text and icon
    updateCenterText(text, iconClass);
  
    // Hide all lists, then show the selected one
    document.querySelectorAll(".elements-list").forEach(list => {
      (list as HTMLElement).classList.remove("active");
      (list as HTMLElement).style.opacity = "0";
    });
  
    const selectedList = document.getElementById(listId) as HTMLElement;
    if (selectedList) {
      selectedList.classList.add("active");
      selectedList.style.opacity = "1";
  
      const listItems = selectedList.querySelectorAll(".list-item") as NodeListOf<HTMLElement>;
      listItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 300);
      });
    }
  
    const selectorScreen = document.getElementById("selectorScreen") as HTMLElement;
    if (selectedList && selectedList.classList.contains("active")) {
      selectorScreen.classList.add("move-side");
    } else {
      selectorScreen.classList.remove("move-side");
    }
  }
  
  // Function to add event listeners to each segment
  export function initializeSegmentEvents(): void {
    Object.keys(segmentsData).forEach(segmentId => {
      const segment = document.getElementById(segmentId) as HTMLElement;
      const { text, iconClass } = segmentsData[segmentId];
  
      if (segment) {
        segment.addEventListener("mouseover", () => updateCenterText(text, iconClass));
        segment.addEventListener("mouseout", resetCenterText);
        segment.addEventListener("click", () => selectSegment(segmentId));
      }
    });
  }
  
  // Function to show the mobile list based on button click
  export function showMobileList(listId: string): void {
    // Hide all mobile lists
    document.querySelectorAll(".mobile-elements-list").forEach(list => {
      (list as HTMLElement).style.display = "none";
    });
  
    // Show the selected mobile list
    const selectedList = document.getElementById(listId) as HTMLElement;
    if (selectedList) {
      selectedList.style.display = "block";
    }
  }
  